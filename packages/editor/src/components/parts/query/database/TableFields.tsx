import { useEffect, useMemo, useState } from 'react';
import { PathContext, useEditorContext, useMeta } from '../../../../context';
import { PathCollapsible, ValidationRow } from '../../common';
import { useQueryData } from '../useQueryData';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ScriptCell, SortableHeader, Table, TableCell, TableHeader } from '../../../../components/widgets';
import type { DatabaseColumn } from '@axonivy/inscription-protocol';

type Column = DatabaseColumn & {
  expression: string;
};

export const TableFields = () => {
  const { config, updateSql } = useQueryData();

  const { elementContext: context } = useEditorContext();
  const columnMetas = useMeta('meta/database/columns', { context, database: config.query.dbName, table: config.query.sql.table }, []).data;

  const [data, setData] = useState<Column[]>([]);

  useEffect(() => {
    const fields = config.query.sql.fields;
    const columnData = columnMetas.map<Column>(c => {
      return { ...c, expression: fields[c.name] ?? '' };
    });
    Object.keys(fields)
      .filter(field => !columnData.find(column => column.name === field))
      .forEach(unknown => columnData.push({ name: unknown, expression: fields[unknown], type: '', ivyType: '' }));
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
        cell: cell => <ScriptCell cell={cell} type={cell.row.original.ivyType} browsers={['attr', 'func', 'type', 'cms']} />
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
    <PathContext path='sql'>
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
              <ValidationRow key={row.id} rowPathSuffix={row.original.name}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </ValidationRow>
            ))}
          </tbody>
        </Table>
      </PathCollapsible>
    </PathContext>
  );
};
