import { WfCustomField, CUSTOM_FIELD_TYPE } from '@axonivy/inscription-protocol';
import { IvyIcons } from '@axonivy/editor-icons';
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { memo, useMemo, useState } from 'react';
import {
  SelectItem,
  EditableCell,
  SelectCell,
  Table,
  TableHeader,
  TableCell,
  ActionCell,
  TableFooter,
  TableAddRow,
  SortableHeader
} from '../../../../components/widgets';

const CustomFieldTable = (props: { data: WfCustomField[]; onChange: (change: WfCustomField[]) => void }) => {
  const items = useMemo<SelectItem[]>(() => Object.entries(CUSTOM_FIELD_TYPE).map(([value, label]) => ({ label, value })), []);

  const columns = useMemo<ColumnDef<WfCustomField>[]>(
    () => [
      {
        accessorKey: 'name',
        header: header => <SortableHeader header={header} name='Name' />,
        cell: cell => <EditableCell cell={cell} />,
        footer: props => props.column.id
      },
      {
        accessorKey: 'type',
        header: header => <SortableHeader header={header} name='Type' />,
        cell: cell => <SelectCell cell={cell} items={items} />,
        footer: props => props.column.id
      },
      {
        accessorKey: 'value',
        header: header => <SortableHeader header={header} name='Expression' />,
        cell: cell => <EditableCell cell={cell} />,
        footer: props => props.column.id
      }
    ],
    [items]
  );

  const [sorting, setSorting] = useState<SortingState>([]);

  const addRow = () => {
    const newData = [...props.data];
    newData.push({ name: '', type: 'STRING', value: '' });
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
                {flexRender(header.column.columnDef.header, header.getContext())}
              </TableHeader>
            ))}
            <TableHeader colSpan={1}>Actions</TableHeader>
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
                { label: 'Open custom field configuration', icon: IvyIcons.GoToSource, action: () => {} }
              ]}
            />
          </tr>
        ))}
      </tbody>
      <TableFooter>
        <TableAddRow colSpan={4} addRow={addRow} />
      </TableFooter>
    </Table>
  );
};

export default memo(CustomFieldTable);