import type { WfCustomField, WorkflowType } from '@axonivy/inscription-protocol';
import { CUSTOM_FIELD_TYPE } from '@axonivy/inscription-protocol';
import { IvyIcons } from '@axonivy/ui-icons';
import type { ColumnDef } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { memo, useMemo } from 'react';
import type { SelectItem } from '../../../../components/widgets';
import { ScriptCell } from '../../../../components/widgets';
import { useAction, useEditorContext, useMeta } from '../../../../context';
import { ValidationRow } from '../path/validation/ValidationRow';
import { PathCollapsible } from '../path/PathCollapsible';
import { useResizableEditableTable } from '../table/useResizableEditableTable';
import { deepEqual } from '../../../../utils/equals';
import { ComboCell, SelectCell, SortableHeader, Table, TableBody, TableCell, TableResizableHeader } from '@axonivy/ui-components';

type CustomFieldTableProps = {
  data: WfCustomField[];
  onChange: (change: WfCustomField[]) => void;
  type: WorkflowType;
};

const EMPTY_WFCUSTOMFIELD: WfCustomField = { name: '', type: 'STRING', value: '' } as const;

const CustomFieldTable = ({ data, onChange, type }: CustomFieldTableProps) => {
  const items = useMemo<SelectItem[]>(() => Object.entries(CUSTOM_FIELD_TYPE).map(([value, label]) => ({ label, value })), []);

  const { context } = useEditorContext();

  const predefinedCustomField: WfCustomField[] = useMeta('meta/workflow/customFields', { context, type: type }, []).data;

  const columns = useMemo<ColumnDef<WfCustomField, string>[]>(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => <SortableHeader column={column} name='Name' />,
        cell: cell => (
          <ComboCell
            options={predefinedCustomField.filter(pcf => !data.find(d => d.name === pcf.name)).map(pcf => ({ value: pcf.name }))}
            cell={cell}
          />
        )
      },
      {
        accessorKey: 'type',
        header: ({ column }) => <SortableHeader column={column} name='Type' />,
        cell: cell => <SelectCell cell={cell} items={items} />
      },
      {
        accessorKey: 'value',
        header: ({ column }) => <SortableHeader column={column} name='Expression' />,
        cell: cell => <ScriptCell cell={cell} type={CUSTOM_FIELD_TYPE[cell.row.original.type]} browsers={['attr', 'func', 'type', 'cms']} />
      }
    ],
    [data, items, predefinedCustomField]
  );

  const updateCustomFields = (rowId: string, columnId: string, value: string) => {
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
    const autoChangedData =
      columnId === 'name'
        ? updatedData.map((customField, index) => {
            if (index === rowIndex) {
              const predefinedField = predefinedCustomField.find(pcf => pcf.name === customField.name);
              if (predefinedField && predefinedField.type !== customField.type) {
                return { ...customField, type: predefinedField.type };
              }
              return customField;
            }
            return customField;
          })
        : updatedData;
    if (!deepEqual(autoChangedData[updatedData.length - 1], EMPTY_WFCUSTOMFIELD) && rowIndex === data.length - 1) {
      onChange([...autoChangedData, EMPTY_WFCUSTOMFIELD]);
    } else {
      onChange(autoChangedData);
    }
  };

  const { table, rowSelection, setRowSelection, removeRowAction, showAddButton } = useResizableEditableTable({
    data,
    columns,
    onChange,
    emptyDataObject: EMPTY_WFCUSTOMFIELD,
    specialUpdateData: updateCustomFields
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
          removeRowAction
        ]
      : [];

  return (
    <PathCollapsible path='customFields' label='Custom Fields' defaultOpen={data.length > 0} controls={tableActions}>
      <div>
        <Table>
          <TableResizableHeader headerGroups={table.getHeaderGroups()} onClick={() => setRowSelection({})} />
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <ValidationRow row={row} key={row.id} rowPathSuffix={row.original.name}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </ValidationRow>
            ))}
          </TableBody>
        </Table>
        {showAddButton()}
      </div>
    </PathCollapsible>
  );
};

export default memo(CustomFieldTable);
