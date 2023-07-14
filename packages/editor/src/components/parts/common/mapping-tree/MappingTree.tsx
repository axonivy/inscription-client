import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Mapping, VariableInfo } from '@axonivy/inscription-protocol';
import {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table';
import { MappingTreeData } from './mapping-tree-data';
import { IvyIcons } from '@axonivy/editor-icons';
import {
  ScriptCell,
  ExpandableCell,
  ExpandableHeader,
  FieldsetControl,
  Table,
  TableCell,
  TableHeader
} from '../../../../components/widgets';
import { PathFieldset } from '../path/PathFieldset';

type MappingTreeProps = { data: Mapping; variableInfo: VariableInfo; onChange: (change: Mapping) => void };

const MappingTree = ({ data, variableInfo, onChange }: MappingTreeProps) => {
  const [tree, setTree] = useState<MappingTreeData[]>([]);
  const [showGlobalFilter, setShowGlobalFilter] = useState(false);
  const [showOnlyInscribed, setShowOnlyInscribed] = useState(false);

  useEffect(() => {
    const treeData = MappingTreeData.of(variableInfo);
    Object.entries(data).forEach(mapping => MappingTreeData.update(variableInfo, treeData, mapping[0].split('.'), mapping[1]));
    setTree(treeData);
  }, [data, variableInfo]);

  const loadChildren = useCallback<(row: MappingTreeData) => void>(
    row => setTree(tree => MappingTreeData.loadChildrenFor(variableInfo, row.type, tree)),
    [variableInfo, setTree]
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
            isUnknown={cell.row.original.type.length === 0}
            title={cell.row.original.description}
          />
        ),
        footer: props => props.column.id,
        enableSorting: false
      },
      {
        accessorFn: row => row.simpleType,
        id: 'simpleType',
        header: () => <span>Type</span>,
        cell: cell => <span title={cell.row.original.type}>{cell.getValue() as string}</span>,
        footer: props => props.column.id,
        enableSorting: false
      },
      {
        accessorFn: row => row.value,
        id: 'value',
        header: () => <span>Expression</span>,
        cell: cell => <ScriptCell cell={cell} type={cell.row.original.type} />,
        footer: props => props.column.id,
        filterFn: (row, columnId, filterValue) => filterValue || row.original.value.length > 0
      }
    ],
    [loadChildren]
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const tableControls: FieldsetControl[] = [
    {
      label: 'Toggle Search',
      icon: IvyIcons.Search,
      active: showGlobalFilter,
      action: () => {
        setShowGlobalFilter(show => !show);
        setGlobalFilter('');
      }
    },
    {
      label: 'Toggle Inscribed',
      icon: IvyIcons.Rule,
      active: showOnlyInscribed,
      action: () => {
        setShowOnlyInscribed(show => !show);
        setColumnFilters([{ id: 'value', value: showOnlyInscribed }]);
      }
    }
  ];

  const table = useReactTable({
    data: tree,
    columns: columns,
    state: {
      sorting,
      expanded,
      globalFilter,
      columnFilters
    },
    filterFromLeafRows: true,
    onExpandedChange: setExpanded,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getSubRows: row => row.children,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    meta: {
      updateData: (rowId: string, columnId: string, value: unknown) => {
        const rowIndex = rowId.split('.').map(parseFloat);
        onChange(MappingTreeData.to(MappingTreeData.updateDeep(tree, rowIndex, columnId, value)));
      }
    }
  });

  return (
    <PathFieldset label='Mapping' controls={tableControls} path='map'>
      <Table search={showGlobalFilter ? { value: globalFilter, onChange: setGlobalFilter } : undefined}>
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
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </PathFieldset>
  );
};

export default memo(MappingTree);
