import { ValidationRow } from '../../../common';
import { useRestRequestData } from '../../useRestRequestData';
import { ActionCell, EditableCell, ScriptCell, SortableHeader, Table, TableAddRow, TableCell, TableHeader } from '../../../../widgets';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { IvyIcons } from '@axonivy/editor-icons';
import { useEffect, useMemo, useState } from 'react';
import { IVY_SCRIPT_TYPES } from '@axonivy/inscription-protocol';
import { useRestResourceMeta } from '../../useRestResourceMeta';
import type { RestParam } from './rest-parameter';
import { restParamBuilder, toRestMap, updateRestParams } from './rest-parameter';
import { PathContext } from '../../../../../context';

export const RestForm = () => {
  const { config, updateBody } = useRestRequestData();

  const [data, setData] = useState<RestParam[]>([]);
  const restResource = useRestResourceMeta();
  useEffect(() => {
    const restResourceParam = restResource.method?.inBody.type;
    const params = restParamBuilder().openApiParam(restResourceParam).restMap(config.body.form).build();
    setData(params);
  }, [restResource.method?.inBody.type, config.body.form]);

  const onChange = (params: RestParam[]) => updateBody('form', toRestMap(params));

  const [sorting, setSorting] = useState<SortingState>([]);
  const columns = useMemo<ColumnDef<RestParam>[]>(
    () => [
      {
        accessorKey: 'name',
        header: header => <SortableHeader header={header} name='Name' />,
        cell: cell => <EditableCell cell={cell} disabled={cell.row.original.known} />
      },
      {
        accessorKey: 'type',
        header: header => <SortableHeader header={header} name='Type' />,
        cell: cell => <span>{cell.getValue() as string}</span>
      },
      {
        accessorKey: 'expression',
        header: header => <SortableHeader header={header} name='Expression' />,
        cell: cell => (
          <ScriptCell cell={cell} type={cell.row.original.type ?? IVY_SCRIPT_TYPES.OBJECT} browsers={['attr', 'func', 'type', 'cms']} />
        )
      }
    ],
    []
  );

  const addRow = () => {
    const newData = [...data];
    newData.push({ name: '', expression: '', known: false });
    onChange(newData);
  };

  const removeTableRow = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    onChange(newData);
  };

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
        onChange(updateRestParams(data, rowIndex, columnId, value as string));
      }
    }
  });

  return (
    <PathContext path='form'>
      <Table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHeader key={header.id} colSpan={header.colSpan}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHeader>
              ))}
              <TableHeader colSpan={1} />
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <ValidationRow colSpan={3} key={row.id} rowPathSuffix={row.original.name} title={row.original.doc}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
              <ActionCell
                actions={[
                  {
                    label: 'Remove row',
                    icon: IvyIcons.Trash,
                    action: () => removeTableRow(row.index),
                    disabled: row.original.known
                  }
                ]}
              />
            </ValidationRow>
          ))}
        </tbody>
      </Table>
      <TableAddRow addRow={addRow} />
    </PathContext>
  );
};
