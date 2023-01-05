import { Document } from '@axonivy/inscription-core';
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import React, { memo, useState } from 'react';
import { useReadonly } from '../../../context';
import './DocumentTable.css';
import { EditableCell } from './EditableCell';
import { Table, TableCell, TableHeader, TableHeaderSorted } from './Table';

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

  const readonly = useReadonly();

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
            <TableCell key={`${row.id}-actions`}>
              <span className='action-buttons'>
                <button onClick={() => removeTableRow(row.index)} disabled={readonly}>
                  🗑️
                </button>
                <button>🔍</button>
                <button>➡️</button>
              </span>
            </TableCell>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th colSpan={3} className='add-row'>
            <button onClick={addRow} disabled={readonly}>
              <span className='add-row-plus'>+</span>
            </button>
          </th>
        </tr>
      </tfoot>
    </Table>
  );
};

export default memo(DocumentTable);
