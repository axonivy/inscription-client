import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import type { ColumnDef, ColumnFiltersState, ExpandedState, RowSelectionState, SortingState } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { MappingTreeData } from './mapping-tree-data';
import {
  ScriptCell,
  ExpandableCell,
  ExpandableHeader,
  Table,
  TableCell,
  TableHeader,
  ResizableHeader,
  TextHeader
} from '../../../../components/widgets';
import type { MappingPartProps } from './MappingPart';
import type { TableFilter } from './useMappingTree';
import { calcFullPathId } from './useMappingTree';
import { SelectableValidationRow } from '../path/validation/ValidationRow';

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
        header: header => <ExpandableHeader header={header} name='Attribute' seperator={true} />,
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
        accessorFn: row => row.value,
        id: 'value',
        header: header => <TextHeader header={header} name='Expression' />,
        cell: cell => <ScriptCell cell={cell} type={cell.row.original.type} browsers={browsers} placeholder={cell.row.original.type} />,
        footer: props => props.column.id,
        filterFn: (row, columnId, filterValue) => filterValue || row.original.value.length > 0
      }
    ],
    [browsers, loadChildren]
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>(true);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data: tree,
    columns: columns,
    state: {
      sorting,
      expanded,
      rowSelection,
      globalFilter: globalFilter.filter,
      columnFilters: onlyInscribedFilter.filter
    },
    filterFromLeafRows: true,
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
    enableRowSelection: true,
    enableMultiRowSelection: false,
    enableSubRowSelection: false,
    onRowSelectionChange: setRowSelection,
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
          <ResizableHeader key={headerGroup.id} headerGroup={headerGroup} setRowSelection={setRowSelection}>
            {headerGroup.headers.map(header => (
              <TableHeader key={header.id} colSpan={header.colSpan} style={{ width: header.getSize() }}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </TableHeader>
            ))}
          </ResizableHeader>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <SelectableValidationRow row={row} key={row.id} rowPathSuffix={calcFullPathId(row)}>
            {row.getVisibleCells().map(cell => (
              <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </SelectableValidationRow>
        ))}
      </tbody>
    </Table>
  );
};

export default memo(MappingTree);
