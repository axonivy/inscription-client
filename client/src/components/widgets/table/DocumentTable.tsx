import './DocumentTable.css';
import React from 'react';
import { ColumnDef, useReactTable, getCoreRowModel, flexRender, SortingState, getSortedRowModel } from '@tanstack/react-table';
import { Doc } from '../../../data/document';
import { EditableCell, editableCellMeta } from './EditableCell';
import { Table, TableCell, TableHeader, TableHeaderSorted } from './Table';

const DocumentTable = (props: { data: Doc[]; onChange: (change: Doc[]) => void }) => {
  const columns = React.useMemo<ColumnDef<Doc>[]>(
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

  const [data, setData] = React.useState(() => props.data);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const addRow = () =>
    setData(() => {
      const newData = [...data];
      newData.push({ description: '', url: '' });
      props.onChange(newData);
      return newData;
    });

  const removeTableRow = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    props.onChange(newData);
    setData(newData);
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    meta: editableCellMeta(data, (newData: Doc[]) => {
      setData(newData);
      props.onChange(newData);
    })
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

export default DocumentTable;
