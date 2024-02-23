import type { StartCustomStartField } from '@axonivy/inscription-protocol';
import { IvyIcons } from '@axonivy/ui-icons';
import type { ColumnDef } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { memo, useMemo } from 'react';
import {
  Table,
  TableHeader,
  TableCell,
  TableAddRow,
  SortableHeader,
  MacroCell,
  ResizableHeader,
  ComboCell,
  type ComboboxItem
} from '../../../widgets';
import { useAction, useEditorContext, useMeta } from '../../../../context';
import { SelectableValidationRow } from '../path/validation/ValidationRow';
import { PathCollapsible } from '../path/PathCollapsible';
import { useResizableEditableTable } from '../table/useResizableEditableTable';

type StartCustomFieldTableProps = {
  data: StartCustomStartField[];
  onChange: (change: StartCustomStartField[]) => void;
};

const EMPTY_STARTCUSTOMSTARTFIELD: StartCustomStartField = { name: '', value: '' } as const;

const StartCustomFieldTable = ({ data, onChange }: StartCustomFieldTableProps) => {
  const { context } = useEditorContext();
  const predefinedCustomField: ComboboxItem[] = useMeta(
    'meta/workflow/customFields',
    { context, type: 'START' },
    []
  ).data.map<ComboboxItem>(pcf => ({
    value: pcf.name
  }));

  const columns = useMemo<ColumnDef<StartCustomStartField>[]>(
    () => [
      {
        accessorKey: 'name',
        header: header => <SortableHeader header={header} name='Name' seperator={true} />,
        cell: cell => <ComboCell cell={cell} items={predefinedCustomField.filter(pcf => !data.find(d => d.name === pcf.value))} />
      },
      {
        accessorKey: 'value',
        header: header => <SortableHeader header={header} name='Expression' />,
        cell: cell => <MacroCell cell={cell} placeholder={'Enter an Expression'} />
      }
    ],
    [data, predefinedCustomField]
  );

  const { table, rowSelection, setRowSelection, addRow, removeRowAction, showAddButton } = useResizableEditableTable({
    data,
    columns,
    onChange,
    emptyDataObject: EMPTY_STARTCUSTOMSTARTFIELD
  });

  const action = useAction('openCustomField');

  const tableActions =
    table.getSelectedRowModel().rows.length > 0
      ? [
          {
            label: 'Open custom field configuration',
            icon: IvyIcons.GoToSource,
            action: () => action({ name: table.getRowModel().rowsById[Object.keys(rowSelection)[0]].original.name, type: 'START' })
          },
          removeRowAction
        ]
      : [];

  return (
    <PathCollapsible path='customFields' controls={tableActions} label='Custom Fields' defaultOpen={data.length > 0}>
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
            <SelectableValidationRow row={row} key={row.id} rowPathSuffix={row.original.name}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </SelectableValidationRow>
          ))}
        </tbody>
      </Table>
      {showAddButton() && <TableAddRow addRow={addRow} />}
    </PathCollapsible>
  );
};

export default memo(StartCustomFieldTable);
