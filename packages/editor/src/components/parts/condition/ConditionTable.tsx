import { EditableCell, ReorderRow, Table, TableCell, TableHeader } from '../../widgets';
import { useMemo } from 'react';
import { Condition } from './condition';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

const ConditionTypeCell = ({ condition }: { condition: Condition }) => {
  if (condition.target) {
    return <span>{`${condition.target.name}: ${condition.target.type.id}`}</span>;
  }
  return <span>{condition.fid}</span>;
};

const ConditionTable = ({ data, onChange }: { data: Condition[]; onChange: (change: Condition[]) => void }) => {
  const updateOrder = (moveId: string, targetId: string) => {
    onChange(Condition.move(data, moveId, targetId));
  };

  const columns = useMemo<ColumnDef<Condition>[]>(
    () => [
      {
        accessorKey: 'fid',
        header: () => <span>Type</span>,
        cell: cell => <ConditionTypeCell condition={cell.row.original} />,
        footer: props => props.column.id
      },
      {
        accessorKey: 'expression',
        header: () => <span>Expression</span>,
        cell: cell => <EditableCell cell={cell} />,
        footer: props => props.column.id
      }
    ],
    []
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
          <ReorderRow key={row.id} id={row.original.fid} updateOrder={updateOrder}>
            {row.getVisibleCells().map(cell => (
              <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
            ))}
          </ReorderRow>
        ))}
      </tbody>
    </Table>
  );
};

export default ConditionTable;