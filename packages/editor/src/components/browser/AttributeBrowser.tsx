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
import { VariableInfo } from '@axonivy/inscription-protocol';
import { useClient, useEditorContext } from '../../context';
import { calcFullPathId } from '../parts/common/mapping-tree/useMappingTree';

export const ATTRIBUTE_BROWSER_ID = 'attr' as const;

export const useAttributeBrowser = (location: string): UseBrowserImplReturnValue => {
  const [value, setValue] = useState('');
  return {
    id: ATTRIBUTE_BROWSER_ID,
    name: 'Attribute',
    content: <AttributeBrowser value={value} onChange={setValue} location={location} />,
    accept: () => value
  };
};

const AttributeBrowser = ({ value, onChange, location }: { value: string; onChange: (value: string) => void; location: string }) => {
  const [tree, setTree] = useState<MappingTreeData[]>([]);

  const [varInfo, setVarInfo] = useState<VariableInfo>({ variables: [], types: {} });
  const [inVarInfo, setInVarInfo] = useState<VariableInfo>({ variables: [], types: {} });
  const [outVarInfo, setOutVarInfo] = useState<VariableInfo>({ variables: [], types: {} });

  const editorContext = useEditorContext();
  const client = useClient();
  useEffect(() => {
    client.inScripting(editorContext.pid, location).then(info => setInVarInfo(info));
    if (location.endsWith('code')) {
      client.outScripting(editorContext.pid, location).then(info => setOutVarInfo(info));
    }
  }, [client, editorContext.pid, location]);

  useEffect(() => {
    setVarInfo({ variables: [...inVarInfo.variables, ...outVarInfo.variables], types: { ...inVarInfo.types, ...outVarInfo.types } });
  }, [inVarInfo.variables, inVarInfo.types, outVarInfo.variables, outVarInfo.types]);

  useEffect(() => {
    setTree(MappingTreeData.of(varInfo));
  }, [varInfo]);

  const loadChildren = useCallback<(row: MappingTreeData) => void>(
    row => setTree(tree => MappingTreeData.loadChildrenFor(varInfo, row.type, tree)),
    [varInfo]
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
    onChange(calcFullPathId(selectedRow));
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
            <SelectRow key={row.id} row={row}>
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
