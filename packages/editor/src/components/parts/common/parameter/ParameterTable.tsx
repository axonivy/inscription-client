import type { ScriptVariable } from '@axonivy/inscription-protocol';
import { IvyIcons } from '@axonivy/editor-icons';
import type { ColumnDef, RowSelectionState, SortingState } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { memo, useEffect, useMemo, useState } from 'react';
import { EditableCell, Table, TableHeader, TableCell, TableAddRow, SortableHeader, ResizableHeader } from '../../../widgets';
import { SelectableValidationRow } from '../path/validation/ValidationRow';
import { PathCollapsible } from '../path/PathCollapsible';
import { deepEqual } from '../../../../utils/equals';

type ParameterTableProps = {
  data: ScriptVariable[];
  onChange: (change: ScriptVariable[]) => void;
  label: string;
  hideDesc?: boolean;
};

const EMPTY_SCRIPT_VARIABLE: ScriptVariable = { name: '', type: 'String', desc: '' } as const;

const ParameterTable = ({ data, onChange, hideDesc, label }: ParameterTableProps) => {
  const columns = useMemo(() => {
    const colDef: ColumnDef<ScriptVariable>[] = [
      {
        accessorKey: 'name',
        header: header => <SortableHeader header={header} name='Name' seperator={true} />,
        cell: cell => <EditableCell cell={cell} placeholder={'Enter a Name'} />
      },
      {
        accessorKey: 'type',
        header: header => <SortableHeader header={header} name='Type' seperator={true} />,
        cell: cell => <EditableCell cell={cell} withBrowser={true} />
      }
    ];
    if (hideDesc === undefined || !hideDesc) {
      colDef.push({
        accessorKey: 'desc',
        header: header => <SortableHeader header={header} name='Description' />,
        cell: cell => <EditableCell cell={cell} placeholder={'Enter a Description'} />
      });
    }
    return colDef;
  }, [hideDesc]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const addRow = () => {
    const newData = [...data];
    newData.push(EMPTY_SCRIPT_VARIABLE);
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
        if (!deepEqual(updatedData[updatedData.length - 1], EMPTY_SCRIPT_VARIABLE) && rowIndex === data.length - 1) {
          onChange([...updatedData, EMPTY_SCRIPT_VARIABLE]);
        } else {
          onChange(updatedData);
        }
      }
    }
  });

  useEffect(() => {
    if (Object.keys(rowSelection).length !== 1) {
      const filteredData = data.filter(obj => !deepEqual(obj, EMPTY_SCRIPT_VARIABLE));

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
            label: 'Remove row',
            icon: IvyIcons.Trash,
            action: () => removeTableRow(table.getRowModel().rowsById[Object.keys(rowSelection)[0]].index)
          }
        ]
      : [];

  return (
    <PathCollapsible path='params' label={label} controls={tableActions}>
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
            <SelectableValidationRow key={row.id} row={row} rowPathSuffix={row.original.name} colSpan={3}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </SelectableValidationRow>
          ))}
        </tbody>
      </Table>
      {data.filter(obj => deepEqual(obj, EMPTY_SCRIPT_VARIABLE)).length === 0 && <TableAddRow addRow={addRow} />}
    </PathCollapsible>
  );
};

export default memo(ParameterTable);
