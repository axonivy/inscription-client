import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import type {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  SortingState} from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { MappingTreeData } from './mapping-tree-data.js';
import { ScriptCell, ExpandableCell, ExpandableHeader, Table, TableCell, TableHeader } from '../../../../components/widgets/index.js';
import type { MappingPartProps } from './MappingPart.js';
import type { TableFilter} from './useMappingTree.js';
import { calcFullPathId } from './useMappingTree.js';
import { ValidationRow } from '../path/validation/ValidationRow.js';

type MappingTreeProps = MappingPartProps & {
  globalFilter: TableFilter<string>;
  onlyInscribedFilter: TableFilter<ColumnFiltersState>;
};

const MappingTree = ({ data, variableInfo, onChange, globalFilter, onlyInscribedFilter, browsers }: MappingTreeProps) => {
  const [tree, setTree] = useState<MappingTreeData[]>([]);

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
        cell: cell => <ScriptCell cell={cell} type={cell.row.original.type} browsers={browsers} />,
        footer: props => props.column.id,
        filterFn: (row, columnId, filterValue) => filterValue || row.original.value.length > 0
      }
    ],
    [browsers, loadChildren]
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>(true);

  const table = useReactTable({
    data: tree,
    columns: columns,
    state: {
      sorting,
      expanded,
      globalFilter: globalFilter.filter,
      columnFilters: onlyInscribedFilter.filter
    },
    filterFromLeafRows: true,
    onExpandedChange: setExpanded,
    onGlobalFilterChange: globalFilter.setFilter,
    onColumnFiltersChange: onlyInscribedFilter.setFilter,
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
    <Table search={globalFilter.active ? { value: globalFilter.filter, onChange: globalFilter.setFilter } : undefined}>
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
          <ValidationRow key={row.id} rowPathSuffix={calcFullPathId(row)}>
            {row.getVisibleCells().map(cell => (
              <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
            ))}
          </ValidationRow>
        ))}
      </tbody>
    </Table>
  );
};

export default memo(MappingTree);
