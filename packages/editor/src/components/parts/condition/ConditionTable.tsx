import { Button, ScriptCell, EditableCell, Table, TableCell, TableHeader } from '../../widgets';
import { useCallback, useMemo } from 'react';
import { Condition } from './condition';
import type { CellContext, ColumnDef} from '@tanstack/react-table';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { IvyIcons } from '@axonivy/editor-icons';
import { IVY_SCRIPT_TYPES } from '@axonivy/inscription-protocol';
import { ValidationReorderRow } from '../common';

const ConditionTypeCell = ({ condition }: { condition: Condition }) => {
  if (condition.target) {
    return <span>{`${condition.target.name}: ${condition.target.type.id}`}</span>;
  }
  return <span>⛔ {condition.fid}</span>;
};

const ConditionExpressionCell = ({ cell, removeCell }: { cell: CellContext<Condition, unknown>; removeCell: (id: string) => void }) => {
  if (cell.row.original.target) {
    return <ScriptCell cell={cell} type={IVY_SCRIPT_TYPES.BOOLEAN} browsers={['attr', 'func', 'datatype']} />;
  }
  return (
    <span style={{ display: 'flex' }}>
      <EditableCell cell={cell} />
      <Button aria-label='Remove unknown condition' icon={IvyIcons.Delete} onClick={() => removeCell(cell.row.original.fid)} />
    </span>
  );
};

const ConditionTable = ({ data, onChange }: { data: Condition[]; onChange: (change: Condition[]) => void }) => {
  const updateOrder = useCallback(
    (moveId: string, targetId: string) => {
      onChange(Condition.move(data, moveId, targetId));
    },
    [data, onChange]
  );

  const removeCell = useCallback(
    (id: string) => {
      onChange(Condition.remove(data, id));
    },
    [data, onChange]
  );

  const columns = useMemo<ColumnDef<Condition>[]>(
    () => [
      {
        accessorKey: 'fid',
        header: () => <span>Type</span>,
        cell: cell => <ConditionTypeCell condition={cell.row.original} />
      },
      {
        accessorKey: 'expression',
        header: () => <span>Expression</span>,
        cell: cell => <ConditionExpressionCell cell={cell} removeCell={removeCell} />
      }
    ],
    [removeCell]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowId: string, columnId: string, value: unknown) => {
        const rowIndex = parseInt(rowId);
        onChange(Condition.update(data, rowIndex, columnId, value as string));
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
            <TableHeader colSpan={1}></TableHeader>
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <ValidationReorderRow key={row.id} id={row.original.fid} updateOrder={updateOrder} rowPathSuffix={row.index}>
            {row.getVisibleCells().map(cell => (
              <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
            ))}
          </ValidationReorderRow>
        ))}
      </tbody>
    </Table>
  );
};

export default ConditionTable;
