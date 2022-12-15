import { Document } from '@axonivy/inscription-core';
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import React, { memo, useState } from 'react';
import '../../../../style/DocumentTable.css';
import { EditableCell, editableCellMeta } from './EditableCell';
import { Table, TableCell, TableHeader, TableHeaderSorted } from './Table';

const DocumentTable = (props: { data: Document[]; onChange: (change: Document[]) => void }) => {
  const columns = React.useMemo<ColumnDef<Document>[]>(
    () => [
      {
        accessorKey: 'description',
        header: () => <span>Description</span>,
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
    newData.push({ description: '', url: '' });
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
    meta: editableCellMeta(props.data, newData => props.onChange(newData))
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
                <button onClick={() => removeTableRow(row.index)}>🗑️</button>
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
            <button onClick={addRow}>
              <span className='add-row-plus'>+</span>
            </button>
          </th>
        </tr>
      </tfoot>
    </Table>
  );
};

export default memo(DocumentTable);
