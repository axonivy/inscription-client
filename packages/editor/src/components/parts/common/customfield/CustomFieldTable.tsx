import type { WfCustomField, CustomFieldConfigType } from '@axonivy/inscription-protocol';
import { CUSTOM_FIELD_TYPE } from '@axonivy/inscription-protocol';
import { IvyIcons } from '@axonivy/editor-icons';
import type { ColumnDef } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { memo, useMemo } from 'react';
import type { SelectItem } from '../../../../components/widgets';
import {
  EditableCell,
  SelectCell,
  Table,
  TableHeader,
  TableCell,
  TableAddRow,
  SortableHeader,
  ScriptCell,
  ResizableHeader
} from '../../../../components/widgets';
import { useAction } from '../../../../context';
import { SelectableValidationRow } from '../path/validation/ValidationRow';
import { PathCollapsible } from '../path/PathCollapsible';
import { useResizableEditableTable } from '../table/useResizableEditableTable';

type CustomFieldTableProps = {
  data: WfCustomField[];
  onChange: (change: WfCustomField[]) => void;
  type: CustomFieldConfigType;
};

const EMPTY_WFCUSTOMFIELD: WfCustomField = { name: '', type: 'STRING', value: '' } as const;

const CustomFieldTable = ({ data, onChange, type }: CustomFieldTableProps) => {
  const items = useMemo<SelectItem[]>(() => Object.entries(CUSTOM_FIELD_TYPE).map(([value, label]) => ({ label, value })), []);

  const columns = useMemo<ColumnDef<WfCustomField>[]>(
    () => [
      {
        accessorKey: 'name',
        header: header => <SortableHeader header={header} name='Name' seperator={true} />,
        cell: cell => <EditableCell cell={cell} />
      },
      {
        accessorKey: 'type',
        header: header => <SortableHeader header={header} name='Type' seperator={true} />,
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

  const { table, rowSelection, setRowSelection, addRow, removeRow, showAddButton } = useResizableEditableTable({
    data,
    columns,
    onChange,
    emptyDataObject: EMPTY_WFCUSTOMFIELD
  });

  const action = useAction('openCustomField');

  const tableActions =
    table.getSelectedRowModel().rows.length > 0
      ? [
          {
            label: 'Open custom field configuration',
            icon: IvyIcons.GoToSource,
            action: () => action({ name: table.getRowModel().rowsById[Object.keys(rowSelection)[0]].original.name, type })
          },

          {
            label: 'Remove row',
            icon: IvyIcons.Trash,
            action: () => removeRow(table.getRowModel().rowsById[Object.keys(rowSelection)[0]].index)
          }
        ]
      : [];

  return (
    <PathCollapsible path='customFields' label='Custom Fields' defaultOpen={data.length > 0} controls={tableActions}>
      <Table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <ResizableHeader key={headerGroup.id} headerGroup={headerGroup} setRowSelection={setRowSelection}>
              {headerGroup.headers.map(header => (
                <TableHeader key={header.id} colSpan={header.colSpan} style={{ width: header.getSize() }}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHeader>
              ))}
            </ResizableHeader>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <SelectableValidationRow row={row} colSpan={3} key={row.id} rowPathSuffix={row.original.name}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </SelectableValidationRow>
          ))}
        </tbody>
      </Table>
      {showAddButton() && <TableAddRow addRow={addRow} />}
    </PathCollapsible>
  );
};

export default memo(CustomFieldTable);
