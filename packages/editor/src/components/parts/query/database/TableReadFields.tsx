import { ColumnDef, Row, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Checkbox, SortableHeader, Table, TableCell, TableHeader } from '../../../../components/widgets';
import { useEditorContext, useMeta } from '../../../../context';
import { PathCollapsible } from '../../common';
import { useQueryData } from '../useQueryData';
import { useEffect, useMemo, useState } from 'react';
import { DatabaseColumn } from '@axonivy/inscription-protocol';

type Column = Omit<DatabaseColumn, 'ivyType'> & {
  selected: boolean;
};

export const TableReadFields = () => {
  const { config, updateSql } = useQueryData();
  const selectAll = config.query.sql.select?.length === 1 && config.query.sql.select[0] === '*';

  const { context } = useEditorContext();
  const columnMetas = useMeta('meta/database/columns', { context, database: config.query.dbName, table: config.query.sql.table }, []).data;

  const [data, setData] = useState<Column[]>([]);

  useEffect(() => {
    const select = config.query.sql.select;
    const columnData = columnMetas.map<Column>(c => {
      return { ...c, selected: select.includes(c.name) };
    });
    setData(columnData);
  }, [columnMetas, config.query.sql.select]);

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
        accessorKey: 'selected',
        header: header => <SortableHeader header={header} name='Read' />,
        cell: cell => <span>{(cell.getValue() as boolean) ? '✅' : ''}</span>
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
    getSortedRowModel: getSortedRowModel()
  });

  const selectRow = (row: Row<Column>) => {
    const column = row.original.name;
    const select = data.filter(c => c.selected).map(c => c.name);
    const index = select.indexOf(column);
    if (index > -1) {
      select.splice(index, 1);
    } else {
      select.push(column);
    }
    updateSql('select', select);
  };

  return (
    <PathCollapsible label='Fields' path='fields' defaultOpen={!selectAll}>
      <Checkbox label='Select all fields' value={selectAll} onChange={() => updateSql('select', selectAll ? [] : ['*'])} />
      {!selectAll && (
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
              <tr key={row.id} onClick={() => selectRow(row)}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </PathCollapsible>
  );
};
