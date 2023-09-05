import { useEffect, useMemo, useState } from 'react';
import { useEditorContext, useMeta } from '../../../../context';
import { PathCollapsible } from '../../common';
import { useQueryData } from '../useQueryData';
import { ColumnDef, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ScriptCell, SortableHeader, Table, TableCell, TableHeader } from '../../../../components/widgets';
import { DatabaseColumn } from '@axonivy/inscription-protocol';

type Column = DatabaseColumn & {
  expression: string;
};

export const TableFields = () => {
  const { config, updateSql } = useQueryData();

  const { context } = useEditorContext();
  const columnMetas = useMeta('meta/database/columns', { context, database: config.query.dbName, table: config.query.sql.table }, []).data;

  const [data, setData] = useState<Column[]>([]);

  useEffect(() => {
    const fields = config.query.sql.fields;
    const columnData = columnMetas.map<Column>(c => {
      return { ...c, expression: fields[c.name] ?? '' };
    });
    setData(columnData);
  }, [columnMetas, config.query.sql.fields]);

  const columns = useMemo<ColumnDef<Column>[]>(
    () => [
      {
        accessorKey: 'name',
        header: header => <SortableHeader header={header} name='Column' />,
        cell: cell => <span>{cell.getValue() as string}</span>
      },
      {
        accessorKey: 'type',
        header: header => <SortableHeader header={header} name='Type' />,
        cell: cell => <span>{cell.getValue() as string}</span>
      },
      {
        accessorKey: 'expression',
        header: header => <SortableHeader header={header} name='Value' />,
        cell: cell => <ScriptCell cell={cell} type={cell.row.original.ivyType} />
      }
    ],
    []
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    meta: {
      updateData: (rowId: string, columnId: string, value: unknown) => {
        const rowIndex = parseInt(rowId);
        const fields: Record<string, string> = {};
        data
          .map((row, index) => {
            if (index === rowIndex) {
              return {
                ...data[rowIndex]!,
                [columnId]: value
              };
            }
            return row;
          })
          .filter(d => d.expression.length > 0)
          .forEach(d => (fields[d.name] = d.expression));
        updateSql('fields', fields);
      }
    }
  });

  return (
    <PathCollapsible label='Fields' path='fields' defaultOpen={Object.keys(config.query.sql.fields).length > 0}>
      <Table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHeader key={header.id} colSpan={header.colSpan}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHeader>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </PathCollapsible>
  );
};
