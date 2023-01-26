import React, { memo, useCallback, useEffect, useState } from 'react';

import { Mapping, MappingInfo } from '@axonivy/inscription-protocol';
import {
  ColumnDef,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
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

const MappingTree = (props: { data: Mapping[]; mappingInfo: MappingInfo; onChange: (change: Mapping[]) => void }) => {
  const [tree, setTree] = useState<MappingTreeData[]>([]);

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
        footer: props => props.column.id
      }
    ],
    [loadChildren]
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>(true);

  const table = useReactTable({
    data: tree,
    columns,
    state: {
      sorting,
      expanded
    },
    onExpandedChange: setExpanded,
    getSubRows: row => row.children,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    meta: {
      updateData: (rowId: string, columnId: string, value: unknown) => {
        const rowIndex = rowId.split('.').map(parseFloat);
        props.onChange(MappingTreeData.to(MappingTreeData.updateDeep(tree, rowIndex, columnId, value)));
      }
    }
  });

  return (
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
  );
};

export default memo(MappingTree);
