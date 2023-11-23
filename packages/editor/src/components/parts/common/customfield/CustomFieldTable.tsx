import type { WfCustomField, CustomFieldConfigType } from '@axonivy/inscription-protocol';
import { CUSTOM_FIELD_TYPE } from '@axonivy/inscription-protocol';
import { IvyIcons } from '@axonivy/editor-icons';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { memo, useMemo, useState } from 'react';
import type { SelectItem } from '../../../../components/widgets';
import {
  EditableCell,
  SelectCell,
  Table,
  TableHeader,
  TableCell,
  ActionCell,
  TableFooter,
  TableAddRow,
  SortableHeader,
  ScriptCell
} from '../../../../components/widgets';
import { useAction } from '../../../../context';
import { ValidationRow } from '../path/validation/ValidationRow';

type CustomFieldTableProps = {
  data: WfCustomField[];
  onChange: (change: WfCustomField[]) => void;
  type: CustomFieldConfigType;
};

const CustomFieldTable = ({ data, onChange, type }: CustomFieldTableProps) => {
  const items = useMemo<SelectItem[]>(() => Object.entries(CUSTOM_FIELD_TYPE).map(([value, label]) => ({ label, value })), []);

  const columns = useMemo<ColumnDef<WfCustomField>[]>(
    () => [
      {
        accessorKey: 'name',
        header: header => <SortableHeader header={header} name='Name' />,
        cell: cell => <EditableCell cell={cell} />
      },
      {
        accessorKey: 'type',
        header: header => <SortableHeader header={header} name='Type' />,
        cell: cell => <SelectCell cell={cell} items={items} />
      },
      {
        accessorKey: 'value',
        header: header => <SortableHeader header={header} name='Expression' />,
        cell: cell => <ScriptCell cell={cell} type={CUSTOM_FIELD_TYPE[cell.row.original.type]} browsers={['attr', 'func', 'type', 'cms']} />
      }
    ],
    [items]
  );

  const [sorting, setSorting] = useState<SortingState>([]);

  const addRow = () => {
    const newData = [...data];
    newData.push({ name: '', type: 'STRING', value: '' });
    onChange(newData);
  };

  const removeTableRow = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    onChange(newData);
  };

  const table = useReactTable({
    data: data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    meta: {
      updateData: (rowId: string, columnId: string, value: unknown) => {
        const rowIndex = parseInt(rowId);
        onChange(
          data.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...data[rowIndex]!,
                [columnId]: value
              };
            }
            return row;
          })
        );
      }
    }
  });

  const action = useAction('openCustomField');

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
            <TableHeader colSpan={1} />
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <ValidationRow key={row.id} rowPathSuffix={row.original.name}>
            {row.getVisibleCells().map(cell => (
              <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
            ))}
            <ActionCell
              actions={[
                { label: 'Remove row', icon: IvyIcons.Trash, action: () => removeTableRow(row.index) },
                {
                  label: 'Open custom field configuration',
                  icon: IvyIcons.GoToSource,
                  action: () => action({ name: row.original.name, type })
                }
              ]}
            />
          </ValidationRow>
        ))}
      </tbody>
      <TableFooter>
        <TableAddRow colSpan={4} addRow={addRow} />
      </TableFooter>
    </Table>
  );
};

export default memo(CustomFieldTable);
