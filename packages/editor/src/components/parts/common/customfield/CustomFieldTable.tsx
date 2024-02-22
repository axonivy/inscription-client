import type { WfCustomField, WorkflowType } from '@axonivy/inscription-protocol';
import { CUSTOM_FIELD_TYPE } from '@axonivy/inscription-protocol';
import { IvyIcons } from '@axonivy/editor-icons';
import type { ColumnDef } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { memo, useMemo } from 'react';
import type { SelectItem } from '../../../../components/widgets';
import {
  SelectCell,
  Table,
  TableHeader,
  TableCell,
  TableAddRow,
  SortableHeader,
  ScriptCell,
  ResizableHeader,
  ComboCell
} from '../../../../components/widgets';
import { useAction, useEditorContext, useMeta } from '../../../../context';
import { SelectableValidationRow } from '../path/validation/ValidationRow';
import { PathCollapsible } from '../path/PathCollapsible';
import { useResizableEditableTable } from '../table/useResizableEditableTable';
import { deepEqual } from '../../../../utils/equals';

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

  const columns = useMemo<ColumnDef<WfCustomField>[]>(
    () => [
      {
        accessorKey: 'name',
        header: header => <SortableHeader header={header} name='Name' seperator={true} />,
        cell: cell => (
          <ComboCell
            items={predefinedCustomField.filter(pcf => !data.find(d => d.name === pcf.name)).map(pcf => ({ value: pcf.name }))}
            cell={cell}
          />
        )
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
    [data, items, predefinedCustomField]
  );

  const updateCustomFields = (rowId: string, columnId: string, value: unknown) => {
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

  const { table, rowSelection, setRowSelection, addRow, removeRowAction, showAddButton } = useResizableEditableTable({
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
