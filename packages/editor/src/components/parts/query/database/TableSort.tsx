import { useEffect, useMemo, useState } from 'react';
import { PathCollapsible } from '../../common/index.js';
import { useQueryData } from '../useQueryData.js';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import type { SelectItem } from '../../../../components/widgets/index.js';
import {
  ActionCell,
  ReorderRow,
  SelectCell,
  SortableHeader,
  Table,
  TableAddRow,
  TableCell,
  TableFooter,
  TableHeader
} from '../../../../components/widgets/index.js';
import { useMeta, useEditorContext } from '../../../../context/index.js';
import { QUERY_ORDER } from '@axonivy/inscription-protocol';
import { IvyIcons } from '@axonivy/editor-icons';
import { arraymove, indexOf } from '../../../../utils/array.js';

type OrderDirection = keyof typeof QUERY_ORDER;

type Column = {
  name: string;
  sorting: OrderDirection;
};

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
        header: header => <SortableHeader header={header} name='Column' />,
        cell: cell => <SelectCell cell={cell} items={columnItems.filter(item => indexOf(data, obj => obj.name === item.value) === -1)} />
      },
      {
        accessorKey: 'sorting',
        header: header => <SortableHeader header={header} name='Direction' />,
        cell: cell => <SelectCell cell={cell} items={orderItems} />
      }
    ],
    [columnItems, data, orderItems]
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
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

  const removeRow = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    updateOrderBy(newData);
  };

  const addRow = () => {
    const newData = [...data];
    newData.push({ name: '', sorting: 'ASCENDING' });
    setData(newData);
  };

  const updateOrder = (moveId: string, targetId: string) => {
    const fromIndex = indexOf(data, obj => obj.name === moveId);
    const toIndex = indexOf(data, obj => obj.name === targetId);
    arraymove(data, fromIndex, toIndex);
    updateOrderBy(data);
  };

  return (
    <PathCollapsible label='Sort' path='orderBy' defaultOpen={config.query.sql.orderBy?.length > 0}>
      <Table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHeader key={header.id} colSpan={header.colSpan}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHeader>
              ))}
              <TableHeader colSpan={2} />
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <ReorderRow key={row.id} id={row.original.name} updateOrder={updateOrder}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
              <ActionCell actions={[{ label: 'Remove row', icon: IvyIcons.Trash, action: () => removeRow(row.index) }]} />
            </ReorderRow>
          ))}
        </tbody>
        <TableFooter>
          <TableAddRow colSpan={4} addRow={addRow} />
        </TableFooter>
      </Table>
    </PathCollapsible>
  );
};
