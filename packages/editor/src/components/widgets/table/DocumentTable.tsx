import { Document } from '@axonivy/inscription-protocol';
import { IvyIcons } from '@axonivy/editor-icons';
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import React, { memo, useState } from 'react';
import { EditableCell } from './cell/EditableCell';
import { TableAddRow, TableFooter } from './footer/TableFooter';
import { Table } from './table/Table';
import { TableHeader, TableHeaderSorted } from './header/TableHeader';
import { TableCell } from './cell/TableCell';
import { ActionCell } from './cell/ActionCell';

const DocumentTable = (props: { data: Document[]; onChange: (change: Document[]) => void }) => {
  const columns = React.useMemo<ColumnDef<Document>[]>(
    () => [
      {
        accessorKey: 'name',
        header: () => <span>Name</span>,
        cell: cell => <EditableCell cell={cell} />,
        footer: props => props.column.id
      },
      {
        accessorFn: row => row.url,
        id: 'url',
        header: () => <span>URL</span>,
        cell: cell => <EditableCell cell={cell} />,
        footer: props => props.column.id
      }
    ],
    []
  );

  const [sorting, setSorting] = useState<SortingState>([]);

  const addRow = () => {
    const newData = [...props.data];
    newData.push({ name: '', url: '' });
    props.onChange(newData);
  };

  const removeTableRow = (index: number) => {
    const newData = [...props.data];
    newData.splice(index, 1);
    props.onChange(newData);
  };

  const table = useReactTable({
    data: props.data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    meta: {
      updateData: (rowId: string, columnId: string, value: unknown) => {
        const rowIndex = parseInt(rowId);
        props.onChange(
          props.data.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...props.data[rowIndex]!,
                [columnId]: value
              };
            }
            return row;
          })
        );
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
                <TableHeaderSorted header={header} />
              </TableHeader>
            ))}
            <TableHeader colSpan={2}>Actions</TableHeader>
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
            ))}
            <ActionCell
              actions={[
                { label: 'Remove row', icon: IvyIcons.Delete, action: () => removeTableRow(row.index) },
                { label: 'Browse', icon: IvyIcons.Search, action: () => {} },
                { label: 'Open URL', icon: IvyIcons.GoToSource, action: () => {} }
              ]}
            />
          </tr>
        ))}
      </tbody>
      <TableFooter>
        <TableAddRow colSpan={3} addRow={addRow} />
      </TableFooter>
    </Table>
  );
};

export default memo(DocumentTable);
