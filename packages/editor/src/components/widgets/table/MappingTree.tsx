import React, { memo, useCallback, useEffect, useState } from 'react';
import { Mapping, MappingInfo } from '@axonivy/inscription-protocol';
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
import { EditableCell } from './cell/EditableCell';
import { ExpandableCell } from './cell/ExpandableCell';
import { Table } from './table/Table';
import { MappingTreeData } from './mapping-tree-data';
import { ExpandableHeader, TableHeader } from './header/TableHeader';
import { TableCell } from './cell/TableCell';
import Input from '../input/Input';
import { IvyIcons } from '@axonivy/editor-icons';
import { LabelWithControls, Control } from '../label';

const MappingTree = (props: { data: Mapping[]; mappingInfo: MappingInfo; onChange: (change: Mapping[]) => void }) => {
  const [tree, setTree] = useState<MappingTreeData[]>([]);
  const [showGlobalFilter, setShowGlobalFilter] = useState(false);
  const [showOnlyInscribed, setShowOnlyInscribed] = useState(false);

  useEffect(() => {
    const treeData = MappingTreeData.of(props.mappingInfo);
    props.data?.forEach(mapping => MappingTreeData.update(props.mappingInfo, treeData, mapping.key.split('.'), mapping.value));
    setTree(treeData);
  }, [props.data, props.mappingInfo]);

  const loadChildren = useCallback(
    (row: MappingTreeData) => {
      console.log(row.type);
      setTree(tree => MappingTreeData.loadChildrenFor(props.mappingInfo, row.type, tree));
    },
    [props.mappingInfo, setTree]
  );

  const columns = React.useMemo<ColumnDef<MappingTreeData>[]>(
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
        cell: cell => <EditableCell cell={cell} />,
        footer: props => props.column.id,
        filterFn: (row, columnId, filterValue) => filterValue || row.original.value.length > 0
      }
    ],
    [loadChildren]
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const tableControls: Control[] = [
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
        props.onChange(MappingTreeData.to(MappingTreeData.updateDeep(tree, rowIndex, columnId, value)));
      }
    }
  });

  return (
    <LabelWithControls label='Mapping' htmlFor='mapping' controls={tableControls}>
      {showGlobalFilter && <Input value={globalFilter} onChange={setGlobalFilter} icon={IvyIcons.Search} placeholder='Search' />}
      <Table>
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
    </LabelWithControls>
  );
};

export default memo(MappingTree);
