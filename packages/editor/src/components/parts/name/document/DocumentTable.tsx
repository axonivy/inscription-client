import type { Document } from '@axonivy/inscription-protocol';
import { IvyIcons } from '@axonivy/editor-icons';
import type { ColumnDef, RowSelectionState, SortingState } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { memo, useEffect, useMemo, useState } from 'react';
import {
  Collapsible,
  EditableCell,
  ResizableHeader,
  SelectRow,
  SortableHeader,
  Table,
  TableAddRow,
  TableCell,
  TableHeader
} from '../../../../components/widgets';
import { useAction } from '../../../../context';
import { deepEqual } from '../../../../utils/equals';

const EMPTY_DOCUMENT: Document = { name: '', url: '' } as const;

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
        cell: cell => <EditableCell cell={cell} placeholder={'Enter a URL'} />
      }
    ],
    []
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const addRow = () => {
    const newData = [...data];
    newData.push(EMPTY_DOCUMENT);
    onChange(newData);
    setRowSelection({ [`${newData.length - 1}`]: true });
  };

  const removeTableRow = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    if (newData.length === 0) {
      setRowSelection({});
    } else if (index === data.length - 1) {
      setRowSelection({ [`${newData.length - 1}`]: true });
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
        if (!deepEqual(updatedData[updatedData.length - 1], EMPTY_DOCUMENT) && rowIndex === data.length - 1) {
          onChange([...updatedData, EMPTY_DOCUMENT]);
        } else {
          onChange(updatedData);
        }
      }
    }
  });

  const action = useAction('openPage');

  useEffect(() => {
    if (Object.keys(rowSelection).length !== 1) {
      const filteredData = data.filter(obj => !deepEqual(obj, EMPTY_DOCUMENT));

      if (filteredData.length !== data.length) {
        setRowSelection({});
        onChange(filteredData);
      }
      return;
    }
  }, [data, onChange, rowSelection, table]);

  const tableActions =
    table.getSelectedRowModel().rows.length > 0
      ? [
          { label: 'Browse', icon: IvyIcons.Search, action: () => {} },
          {
            label: 'Open URL',
            icon: IvyIcons.GoToSource,
            action: () => action(table.getRowModel().rowsById[Object.keys(rowSelection)[0]].original.url)
          },
          {
            label: 'Remove row',
            icon: IvyIcons.Trash,
            action: () => removeTableRow(table.getRowModel().rowsById[Object.keys(rowSelection)[0]].index)
          }
        ]
      : [];

  return (
    <Collapsible label='Means / Documents' controls={tableActions} defaultOpen={data !== undefined && data.length > 0}>
      <Table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <ResizableHeader key={headerGroup.id} headerGroup={headerGroup} setRowSelection={setRowSelection}>
              {headerGroup.headers.map(header => (
                <TableHeader colSpan={1} key={header.id} style={{ width: header.getSize() }}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHeader>
              ))}
            </ResizableHeader>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <SelectRow key={row.id} row={row}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </SelectRow>
          ))}
        </tbody>
      </Table>
      {data.filter(obj => deepEqual(obj, EMPTY_DOCUMENT)).length === 0 && <TableAddRow addRow={addRow} />}
    </Collapsible>
  );
};

export default memo(DocumentTable);
