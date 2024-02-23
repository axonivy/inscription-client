import type { Document } from '@axonivy/inscription-protocol';
import { IvyIcons } from '@axonivy/ui-icons';
import type { ColumnDef } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { memo, useMemo } from 'react';
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
import { useResizableEditableTable } from '../../common/table/useResizableEditableTable';

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

  const { table, rowSelection, setRowSelection, addRow, removeRowAction, showAddButton } = useResizableEditableTable({
    data,
    columns,
    onChange,
    emptyDataObject: EMPTY_DOCUMENT
  });

  const action = useAction('openPage');

  const tableActions =
    table.getSelectedRowModel().rows.length > 0
      ? [
          { label: 'Browse', icon: IvyIcons.Search, action: () => {} },
          {
            label: 'Open URL',
            icon: IvyIcons.GoToSource,
            action: () => action(table.getRowModel().rowsById[Object.keys(rowSelection)[0]].original.url)
          },
          removeRowAction
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
      {showAddButton() && <TableAddRow addRow={addRow} />}
    </Collapsible>
  );
};

export default memo(DocumentTable);
