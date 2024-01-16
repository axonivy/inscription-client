import type { Document } from '@axonivy/inscription-protocol';
import { IvyIcons } from '@axonivy/editor-icons';
import type { ColumnDef, RowSelectionState, SortingState } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { memo, useEffect, useMemo, useState } from 'react';
import {
  Collapsible,
  EditableCell,
  SelectRow,
  SortableHeader,
  Table,
  TableAddRow,
  TableCell,
  TableHeader
} from '../../../../components/widgets';
import { useAction } from '../../../../context';

const DocumentTable = ({ data, onChange }: { data: Document[]; onChange: (change: Document[]) => void }) => {
  const columns = useMemo<ColumnDef<Document>[]>(
    () => [
      {
        accessorKey: 'name',
        header: header => <SortableHeader header={header} name='Name' seperator={true} />,
        cell: cell => <EditableCell cell={cell} placeholder={'Enter a Name'} />
      },
      {
        accessorFn: row => row.url,
        id: 'url',
        header: header => <SortableHeader header={header} name='URL' />,
        cell: cell => <EditableCell cell={cell} placeholder={'Enter a Name'} />
      }
    ],
    []
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [rowIndex, setRowIndex] = useState(-1);
  const [rowUrl, setRowUrl] = useState('');

  const addRow = () => {
    const newData = [...data];
    newData.push({ name: '', url: '' });
    onChange(newData);
  };

  const removeTableRow = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    if (newData.length === 0) {
      setRowSelection({});
      setRowIndex(-1);
    } else if (index === data.length - 1) {
      setRowSelection({ [`${newData.length - 1}`]: true });
      setRowIndex(newData.length - 1);
    }
    onChange(newData);
  };

  const table = useReactTable({
    data: data,
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
        const updatedData = data.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...data[rowIndex]!,
              [columnId]: value
            };
          }
          return row;
        });
        onChange(updatedData);
      }
    }
  });

  const action = useAction('openPage');

  useEffect(() => {
    if (Object.keys(rowSelection).length !== 1) {
      const filteredData = data.filter(obj => obj.name !== '' || obj.url !== '');

      if (filteredData.length !== data.length && data.length > 1) {
        onChange(filteredData);
      }
      return;
    }
    const selectedRow = table.getRowModel().rowsById[Object.keys(rowSelection)[0]];
    setRowIndex(selectedRow.index);
    setRowUrl(selectedRow.original.url);
  }, [data, onChange, rowSelection, table]);

  const tableActions =
    rowIndex > -1
      ? [
          { label: 'Browse', icon: IvyIcons.Search, action: () => {} },
          { label: 'Open URL', icon: IvyIcons.GoToSource, action: () => action(rowUrl) }
        ]
      : [];

  return (
    <Collapsible label='Means / Documents' controls={tableActions}>
      <Table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr
              key={headerGroup.id}
              onClick={() => {
                setRowIndex(-1);
                setRowSelection({});
              }}
              onDoubleClick={() => {
                headerGroup.headers.forEach(header => {
                  header.column.resetSize();
                });
              }}
            >
              {headerGroup.headers.map(header => (
                <TableHeader key={header.id} colSpan={header.colSpan} columnWidth={header.getSize()}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHeader>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <SelectRow key={row.id} row={row} removeRow={() => removeTableRow(row.index)}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id} cellWidth={cell.column.getSize()}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </SelectRow>
          ))}
        </tbody>
      </Table>
      <TableAddRow colSpan={3} addRow={addRow} />
    </Collapsible>
  );
};

export default memo(DocumentTable);
