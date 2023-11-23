import { PathCollapsible, ValidationRow } from '../../../common';
import { useRestRequestData } from '../../useRestRequestData';
import type { SelectItem } from '../../../../widgets';
import {
  ActionCell,
  EditableCell,
  ScriptCell,
  SelectCell,
  SortableHeader,
  Table,
  TableAddRow,
  TableCell,
  TableFooter,
  TableHeader
} from '../../../../widgets';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { IvyIcons } from '@axonivy/editor-icons';
import { useEffect, useMemo, useState } from 'react';
import { IVY_SCRIPT_TYPES, REST_PARAM_KIND } from '@axonivy/inscription-protocol';
import { Parameter } from './parameters';
import { useRestResourceMeta } from '../../useRestResourceMeta';
import { useFindPathParams } from './usePathParams';

export const RestParameters = () => {
  const { config, updateParameters } = useRestRequestData();

  const [data, setData] = useState<Parameter[]>([]);
  const foundPathParams = useFindPathParams();
  const restResource = useRestResourceMeta();
  useEffect(() => {
    const restResourceQueryParams = restResource.queryParams ?? [];
    const restResourcePathParams = restResource.pathParams ?? [];
    const queryParams = Parameter.of(restResourceQueryParams, [], config.target.queryParams, 'Query');
    const pathParams = Parameter.of(restResourcePathParams, foundPathParams, config.target.templateParams, 'Path');
    setData([...pathParams, ...queryParams]);
  }, [foundPathParams, restResource.queryParams, restResource.pathParams, config.target.queryParams, config.target.templateParams]);

  const onChange = (props: Parameter[]) =>
    updateParameters({ queryParams: Parameter.to(props, 'Query'), templateParams: Parameter.to(props, 'Path') });
  const kindItems = useMemo<SelectItem[]>(() => Object.entries(REST_PARAM_KIND).map(([value, label]) => ({ label, value })), []);

  const [sorting, setSorting] = useState<SortingState>([]);
  const columns = useMemo<ColumnDef<Parameter>[]>(
    () => [
      {
        accessorKey: 'kind',
        header: header => <SortableHeader header={header} name='Kind' />,
        cell: cell => <SelectCell cell={cell} items={kindItems} disabled={cell.row.original.known} />
      },
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
    [kindItems]
  );

  const addRow = () => {
    const newData = [...data];
    newData.push({ kind: 'Query', name: '', expression: '', known: false });
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
        onChange(Parameter.update(data, rowIndex, columnId, value as string));
      }
    }
  });

  return (
    <PathCollapsible label='Parameters' path='parameters' defaultOpen={data.length > 0}>
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
            <ValidationRow key={row.id} rowPathSuffix={row.original.name} title={row.original.doc}>
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
        <TableFooter>
          <TableAddRow colSpan={4} addRow={addRow} />
        </TableFooter>
      </Table>
    </PathCollapsible>
  );
};
