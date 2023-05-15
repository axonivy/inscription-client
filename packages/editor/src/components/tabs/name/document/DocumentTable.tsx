import { Document } from '@axonivy/inscription-protocol';
import { IvyIcons } from '@axonivy/editor-icons';
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import React, { memo, useState } from 'react';
import {
  ActionCell,
  EditableCell,
  FieldsetData,
  SortableHeader,
  Table,
  TableAddRow,
  TableCell,
  TableFooter,
  TableHeader
} from '../../../../components/widgets';

const DocumentTable = ({ data }: { data: FieldsetData<Document[]> }) => {
  const columns = React.useMemo<ColumnDef<Document>[]>(
    () => [
      {
        accessorKey: 'name',
        header: header => <SortableHeader header={header} name='Name' />,
        cell: cell => <EditableCell cell={cell} />,
        footer: props => props.column.id
      },
      {
        accessorFn: row => row.url,
        id: 'url',
        header: header => <SortableHeader header={header} name='URL' />,
        cell: cell => <EditableCell cell={cell} />,
        footer: props => props.column.id
      }
    ],
    []
  );

  const [sorting, setSorting] = useState<SortingState>([]);

  const addRow = () => {
    const newData = [...data.data];
    newData.push({ name: '', url: '' });
    data.updateData(newData);
  };

  const removeTableRow = (index: number) => {
    const newData = [...data.data];
    newData.splice(index, 1);
    data.updateData(newData);
  };

  const table = useReactTable({
    data: data.data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    meta: {
      updateData: (rowId: string, columnId: string, value: unknown) => {
        const rowIndex = parseInt(rowId);
        data.updateData(
          data.data.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...data.data[rowIndex]!,
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
                {flexRender(header.column.columnDef.header, header.getContext())}
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
