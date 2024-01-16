import type { StartCustomStartField } from '@axonivy/inscription-protocol';
import { IvyIcons } from '@axonivy/editor-icons';
import type { ColumnDef, RowSelectionState, SortingState } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { memo, useEffect, useMemo, useState } from 'react';
import { EditableCell, Table, TableHeader, TableCell, TableAddRow, SortableHeader, MacroCell, ResizableHeader } from '../../../widgets';
import { useAction } from '../../../../context';
import { SelectableValidationRow } from '../path/validation/ValidationRow';
import { PathCollapsible } from '../path/PathCollapsible';
import { deepEqual } from '../../../../utils/equals';

type StartCustomFieldTableProps = {
  data: StartCustomStartField[];
  onChange: (change: StartCustomStartField[]) => void;
};

const EMPTY_STARTCUSTOMSTARTFIELD: StartCustomStartField = { name: '', value: '' } as const;

const StartCustomFieldTable = ({ data, onChange }: StartCustomFieldTableProps) => {
  const columns = useMemo<ColumnDef<StartCustomStartField>[]>(
    () => [
      {
        accessorKey: 'name',
        header: header => <SortableHeader header={header} name='Name' seperator={true} />,
        cell: cell => <EditableCell cell={cell} placeholder={'Enter a Name'} />
      },
      {
        accessorKey: 'value',
        header: header => <SortableHeader header={header} name='Expression' />,
        cell: cell => <MacroCell cell={cell} placeholder={'Enter an Expression'} />
      }
    ],
    []
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const addRow = () => {
    const newData = [...data];
    newData.push(EMPTY_STARTCUSTOMSTARTFIELD);
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
        if (!deepEqual(updatedData[updatedData.length - 1], EMPTY_STARTCUSTOMSTARTFIELD) && rowIndex === data.length - 1) {
          onChange([...updatedData, EMPTY_STARTCUSTOMSTARTFIELD]);
        } else {
          onChange(updatedData);
        }
      }
    }
  });

  const action = useAction('openCustomField');

  useEffect(() => {
    if (Object.keys(rowSelection).length !== 1) {
      const filteredData = data.filter(obj => !deepEqual(obj, EMPTY_STARTCUSTOMSTARTFIELD));

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
            action: () => action({ name: table.getRowModel().rowsById[Object.keys(rowSelection)[0]].original.name, type: 'START' })
          },
          {
            label: 'Remove row',
            icon: IvyIcons.Trash,
            action: () => removeTableRow(table.getRowModel().rowsById[Object.keys(rowSelection)[0]].index)
          }
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
      {data.filter(obj => deepEqual(obj, EMPTY_STARTCUSTOMSTARTFIELD)).length === 0 && <TableAddRow addRow={addRow} />}
    </PathCollapsible>
  );
};

export default memo(StartCustomFieldTable);
