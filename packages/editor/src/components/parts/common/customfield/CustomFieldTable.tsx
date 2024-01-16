import type { WfCustomField, CustomFieldConfigType } from '@axonivy/inscription-protocol';
import { CUSTOM_FIELD_TYPE } from '@axonivy/inscription-protocol';
import { IvyIcons } from '@axonivy/editor-icons';
import type { ColumnDef, RowSelectionState, SortingState } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { memo, useEffect, useMemo, useState } from 'react';
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
import { deepEqual } from '../../../../utils/equals';

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

  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const addRow = () => {
    const newData = [...data];
    newData.push(EMPTY_WFCUSTOMFIELD);
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
        if (!deepEqual(updatedData[updatedData.length - 1], EMPTY_WFCUSTOMFIELD) && rowIndex === data.length - 1) {
          onChange([...updatedData, EMPTY_WFCUSTOMFIELD]);
        } else {
          onChange(updatedData);
        }
      }
    }
  });

  const action = useAction('openCustomField');

  useEffect(() => {
    if (Object.keys(rowSelection).length !== 1) {
      const filteredData = data.filter(obj => !deepEqual(obj, EMPTY_WFCUSTOMFIELD));

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
          {
            label: 'Open custom field configuration',
            icon: IvyIcons.GoToSource,
            action: () => action({ name: table.getRowModel().rowsById[Object.keys(rowSelection)[0]].original.name, type })
          },

          {
            label: 'Remove row',
            icon: IvyIcons.Trash,
            action: () => removeTableRow(table.getRowModel().rowsById[Object.keys(rowSelection)[0]].index)
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
      {data.filter(obj => deepEqual(obj, EMPTY_WFCUSTOMFIELD)).length === 0 && <TableAddRow addRow={addRow} />}
    </PathCollapsible>
  );
};

export default memo(CustomFieldTable);
