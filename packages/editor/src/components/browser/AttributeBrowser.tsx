import { useCallback, useEffect, useMemo, useState } from 'react';
import { ExpandableCell, ExpandableHeader, Table, TableCell, TableHeader, SelectRow } from '../widgets';
import { UseBrowserImplReturnValue } from './useBrowser';
import {
  ColumnDef,
  ExpandedState,
  RowSelectionState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table';
import { MappingTreeData } from '../parts/common/mapping-tree/mapping-tree-data';
import { MappingInfo } from '@axonivy/inscription-protocol';
import { useClient, useEditorContext } from '../../context';

export const ATTRIBUTE_BROWSER_ID = 'attr' as const;

export const useAttributeBrowser = (): UseBrowserImplReturnValue => {
  const [value, setValue] = useState('');
  return {
    id: ATTRIBUTE_BROWSER_ID,
    name: 'Attribute',
    content: <AttributeBrowser value={value} onChange={setValue} />,
    accept: () => value
  };
};

const AttributeBrowser = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  const [tree, setTree] = useState<MappingTreeData[]>([]);

  const [mappingInfo, setMappingInfo] = useState<MappingInfo>({ variables: [], types: {} });

  const editorContext = useEditorContext();
  const client = useClient();
  useEffect(() => {
    client.outMapping(editorContext.pid).then(mapping => setMappingInfo(mapping));
  }, [client, editorContext.pid]);

  useEffect(() => {
    setTree(MappingTreeData.of(mappingInfo));
  }, [mappingInfo]);

  const loadChildren = useCallback<(row: MappingTreeData) => void>(
    row => setTree(tree => MappingTreeData.loadChildrenFor(mappingInfo, row.type, tree)),
    [mappingInfo]
  );

  const columns = useMemo<ColumnDef<MappingTreeData>[]>(
    () => [
      {
        accessorFn: row => row.attribute,
        id: 'attribute',
        header: header => <ExpandableHeader header={header} name='Attribute' />,
        cell: cell => (
          <ExpandableCell
            cell={cell}
            isLoaded={cell.row.original.isLoaded}
            loadChildren={() => loadChildren(cell.row.original)}
            title={cell.row.original.description}
          />
        ),
        footer: props => props.column.id
      },
      {
        accessorFn: row => row.simpleType,
        id: 'simpleType',
        header: () => <span>Type</span>,
        cell: cell => <span title={cell.row.original.type}>{cell.getValue() as string}</span>,
        footer: props => props.column.id
      }
    ],
    [loadChildren]
  );

  const [expanded, setExpanded] = useState<ExpandedState>(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data: tree,
    columns: columns,
    state: {
      expanded,
      globalFilter,
      rowSelection
    },
    filterFromLeafRows: true,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    enableSubRowSelection: false,
    onExpandedChange: setExpanded,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getSubRows: row => row.children,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  useEffect(() => {
    if (Object.keys(rowSelection).length !== 1) {
      return;
    }
    const selectedRow = table.getRowModel().rowsById[Object.keys(rowSelection)[0]];
    const fullAttrPath = [...selectedRow.getParentRows().map(parent => parent.original.attribute), selectedRow.original.attribute].join(
      '.'
    );
    onChange(fullAttrPath);
  }, [onChange, rowSelection, table]);

  return (
    <>
      <Table search={{ value: globalFilter, onChange: setGlobalFilter }}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHeader key={header.id} colSpan={header.colSpan}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHeader>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <SelectRow row={row}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </SelectRow>
          ))}
        </tbody>
      </Table>
      <pre className='browser-helptext'>
        <code>{value}</code>
      </pre>
    </>
  );
};
