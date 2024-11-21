import { useCallback, useEffect, useMemo, useState } from 'react';
import { ExpandableCell, SearchTable } from '../../widgets';
import type { UseBrowserImplReturnValue } from '../useBrowser';
import type { ColumnDef, ExpandedState, RowSelectionState } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, getExpandedRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';
import { MappingTreeData } from '../../parts/common/mapping-tree/mapping-tree-data';
import type { VariableInfo } from '@axonivy/inscription-protocol';
import { useEditorContext, useMeta } from '../../../context';
import { calcFullPathId } from '../../parts/common/mapping-tree/useMappingTree';
import { IvyIcons } from '@axonivy/ui-icons';
import type { BrowserValue } from '../Browser';
import { ExpandableHeader, TableBody, TableHead, TableHeader, TableRow } from '@axonivy/ui-components';
import BrowserTableRow from '../BrowserTableRow';

export const ATTRIBUTE_BROWSER_ID = 'attr' as const;

export const useAttributeBrowser = (onDoubleClick: () => void, location: string): UseBrowserImplReturnValue => {
  const [value, setValue] = useState<BrowserValue>({ cursorValue: '' });
  return {
    id: ATTRIBUTE_BROWSER_ID,
    icon: IvyIcons.Attribute,
    name: 'Attribute',
    content: <AttributeBrowser value={value.cursorValue} onChange={setValue} location={location} onDoubleClick={onDoubleClick} />,
    accept: () => value
  };
};

const AttributeBrowser = ({
  value,
  onChange,
  location,
  onDoubleClick
}: {
  value: string;
  onChange: (value: BrowserValue) => void;
  location: string;
  onDoubleClick: () => void;
}) => {
  const [tree, setTree] = useState<MappingTreeData[]>([]);
  const [varInfo, setVarInfo] = useState<VariableInfo>({ variables: [], types: {} });

  const { elementContext: context } = useEditorContext();
  const { data: inVarInfo } = useMeta('meta/scripting/in', { context, location }, { variables: [], types: {} });
  const { data: outVarInfo } = useMeta('meta/scripting/out', { context, location }, { variables: [], types: {} });

  const [showHelper, setShowHelper] = useState(false);

  useEffect(() => {
    if (location.endsWith('code')) {
      setVarInfo({ variables: [...inVarInfo.variables, ...outVarInfo.variables], types: { ...inVarInfo.types, ...outVarInfo.types } });
    } else {
      setVarInfo(inVarInfo);
    }
  }, [inVarInfo, outVarInfo, location]);

  useEffect(() => {
    setTree(MappingTreeData.of(varInfo));
  }, [varInfo]);

  const loadChildren = useCallback<(row: MappingTreeData) => void>(
    row => setTree(tree => MappingTreeData.loadChildrenFor(varInfo, row.type, tree)),
    [varInfo]
  );

  const columns = useMemo<ColumnDef<MappingTreeData, string>[]>(
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
            additionalInfo={cell.row.original.simpleType}
            icon={IvyIcons.Attribute}
          />
        )
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
    setShowHelper(true);
    onChange({ cursorValue: calcFullPathId(selectedRow) });
  }, [onChange, rowSelection, table]);

  return (
    <>
      <SearchTable search={{ value: globalFilter, onChange: setGlobalFilter }}>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <BrowserTableRow key={row.id} row={row} onDoubleClick={onDoubleClick} />
          ))}
        </TableBody>
      </SearchTable>
      {showHelper && (
        <pre className='browser-helptext'>
          <code>{value}</code>
        </pre>
      )}
    </>
  );
};
