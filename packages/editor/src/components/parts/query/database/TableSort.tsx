import { useEffect, useMemo, useState } from 'react';
import { PathCollapsible } from '../../common';
import { useQueryData } from '../useQueryData';
import type { ColumnDef, RowSelectionState, SortingState } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import type { SelectItem } from '../../../../components/widgets';
import {
  ReorderWrapperIcon,
  ResizableHeader,
  SelectCell,
  SelectableReorderRow,
  Table,
  TableAddRow,
  TableCell,
  TableHeader,
  TextHeader
} from '../../../../components/widgets';
import { useEditorContext, useMeta } from '../../../../context';
import { QUERY_ORDER } from '@axonivy/inscription-protocol';
import { arraymove, indexOf } from '../../../../utils/array';
import { IvyIcons } from '@axonivy/ui-icons';

type OrderDirection = keyof typeof QUERY_ORDER;

type Column = {
  name: string;
  sorting: OrderDirection;
};

const EMPTY_COLUMN: Column = { name: '', sorting: 'ASCENDING' };

export const TableSort = () => {
  const { config, updateSql } = useQueryData();
  const [data, setData] = useState<Column[]>([]);

  const { elementContext: context } = useEditorContext();
  const columnItems = useMeta(
    'meta/database/columns',
    { context, database: config.query.dbName, table: config.query.sql.table },
    []
  ).data.map<SelectItem>(c => {
    return { label: c.name, value: c.name };
  });
  const orderItems = useMemo<SelectItem[]>(() => Object.entries(QUERY_ORDER).map(([label, value]) => ({ label, value })), []);

  useEffect(() => {
    const data = config.query.sql.orderBy.map<Column>(order => {
      const parts = order.split(' ');
      const name = parts[0];
      let sorting: OrderDirection = 'ASCENDING';
      if (parts.length > 1 && parts[1] === 'DESC') {
        sorting = 'DESCENDING';
      }
      return { name, sorting };
    });
    setData(data);
  }, [config.query.sql.orderBy]);

  const columns = useMemo<ColumnDef<Column>[]>(
    () => [
      {
        accessorKey: 'name',
        header: header => <TextHeader header={header} name='Column' seperator={true} />,
        cell: cell => <SelectCell cell={cell} items={columnItems} />
      },
      {
        accessorKey: 'sorting',
        header: header => <TextHeader header={header} name='Direction' />,
        cell: cell => (
          <ReorderWrapperIcon>
            <SelectCell cell={cell} items={orderItems} />
          </ReorderWrapperIcon>
        )
      }
    ],
    [columnItems, orderItems]
  );

  const updateOrderBy = (data: Column[]) => {
    const orderBy = data.map(d => {
      let sorting = '';
      if (d.sorting === 'DESCENDING') {
        sorting = ' DESC';
      }
      return `${d.name}${sorting}`;
    });
    updateSql('orderBy', orderBy);
  };

  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    state: { sorting, rowSelection },
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
    enableRowSelection: true,
    enableMultiRowSelection: false,
    enableSubRowSelection: false,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    meta: {
      updateData: (rowId: string, columnId: string, value: unknown) => {
        const rowIndex = parseInt(rowId);
        const newData = data.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...data[rowIndex]!,
              [columnId]: value
            };
          }
          return row;
        });
        updateOrderBy(newData);
      }
    }
  });

  const removeRow = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    if (newData.length === 0) {
      setRowSelection({});
    } else if (index === data.length - 1) {
      setRowSelection({ [`${newData.length - 1}`]: true });
    }
    updateOrderBy(newData);
  };

  const addRow = () => {
    const newData = [...data];
    newData.push(EMPTY_COLUMN);
    setData(newData);
    setRowSelection({ [`${newData.length - 1}`]: true });
  };

  const updateOrder = (moveId: string, targetId: string) => {
    const fromIndex = indexOf(data, obj => obj.name === moveId);
    const toIndex = indexOf(data, obj => obj.name === targetId);
    arraymove(data, fromIndex, toIndex);
    updateOrderBy(data);
  };

  const tableActions =
    table.getSelectedRowModel().rows.length > 0
      ? [
          {
            label: 'Remove row',
            icon: IvyIcons.Trash,
            action: () => removeRow(table.getRowModel().rowsById[Object.keys(rowSelection)[0]].index)
          }
        ]
      : [];

  return (
    <PathCollapsible label='Sort' path='orderBy' defaultOpen={config.query.sql.orderBy?.length > 0} controls={tableActions}>
      <Table>
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
            <SelectableReorderRow colSpan={2} row={row} key={row.id} id={row.original.name} updateOrder={updateOrder}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </SelectableReorderRow>
          ))}
        </tbody>
      </Table>
      {columnItems.length !== table.getRowModel().rows.length && <TableAddRow addRow={addRow} />}
    </PathCollapsible>
  );
};
