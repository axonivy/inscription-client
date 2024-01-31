import type { ScriptVariable } from '@axonivy/inscription-protocol';
import { IvyIcons } from '@axonivy/editor-icons';
import type { ColumnDef } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { memo, useMemo } from 'react';
import { EditableCell, Table, TableHeader, TableCell, TableAddRow, SortableHeader, ResizableHeader } from '../../../widgets';
import { SelectableValidationRow } from '../path/validation/ValidationRow';
import { PathCollapsible } from '../path/PathCollapsible';
import { useResizableEditableTable } from '../table/useResizableEditableTable';

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

  const { table, rowSelection, setRowSelection, addRow, removeRow, showAddButton } = useResizableEditableTable({
    data,
    columns,
    onChange,
    emptyDataObject: EMPTY_SCRIPT_VARIABLE
  });

  const tableActions =
    table.getSelectedRowModel().rows.length > 0
      ? [
          {
            label: 'Remove row',
            icon: IvyIcons.Trash,
            action: () => removeRow(table.getRowModel().rowsById[Object.keys(rowSelection)[0]].index)
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
      {showAddButton() && <TableAddRow addRow={addRow} />}
    </PathCollapsible>
  );
};

export default memo(ParameterTable);
