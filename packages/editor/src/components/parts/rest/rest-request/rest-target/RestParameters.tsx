import { PathCollapsible, SelectableValidationRow } from '../../../common';
import { useRestRequestData } from '../../useRestRequestData';
import type { SelectItem } from '../../../../widgets';
import {
  EditableCell,
  ResizableHeader,
  ScriptCell,
  SelectCell,
  SortableHeader,
  Table,
  TableAddRow,
  TableCell,
  TableHeader
} from '../../../../widgets';
import type { ColumnDef, RowSelectionState, SortingState } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { IvyIcons } from '@axonivy/ui-icons';
import { useEffect, useMemo, useState } from 'react';
import { IVY_SCRIPT_TYPES, REST_PARAM_KIND } from '@axonivy/inscription-protocol';
import { Parameter } from './parameters';
import { useRestResourceMeta } from '../../useRestResourceMeta';
import { useFindPathParams } from './usePathParams';
import { deepEqual } from '../../../../../utils/equals';

const EMPTY_PARAMETER: Parameter = { kind: 'Query', name: '', expression: '', known: false };

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

  const columns = useMemo<ColumnDef<Parameter>[]>(
    () => [
      {
        accessorKey: 'kind',
        header: header => <SortableHeader header={header} name='Kind' seperator={true} />,
        cell: cell => <SelectCell cell={cell} items={kindItems} disabled={cell.row.original.known} />
      },
      {
        accessorKey: 'name',
        header: header => <SortableHeader header={header} name='Name' seperator={true} />,
        cell: cell => <EditableCell cell={cell} disabled={cell.row.original.known} />
      },
      {
        accessorKey: 'expression',
        header: header => <SortableHeader header={header} name='Expression' />,
        cell: cell => (
          <ScriptCell
            cell={cell}
            type={cell.row.original.type ?? IVY_SCRIPT_TYPES.OBJECT}
            browsers={['attr', 'func', 'type', 'cms']}
            placeholder={cell.row.original.type}
          />
        )
      }
    ],
    [kindItems]
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const showAddButton = () => {
    return data.filter(obj => deepEqual(obj, EMPTY_PARAMETER)).length === 0;
  };

  const addRow = () => {
    const newData = [...data];
    newData.push(EMPTY_PARAMETER);
    onChange(newData);
    setRowSelection({ [`${newData.length - 1}`]: true });
  };

  const removeRow = (index: number) => {
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
    data,
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
        onChange(Parameter.update(data, rowIndex, columnId, value as string));
      }
    }
  });

  const tableActions =
    table.getSelectedRowModel().rows.length > 0 && !table.getRowModel().rowsById[Object.keys(rowSelection)[0]].original.known
      ? [
          {
            label: 'Remove row',
            icon: IvyIcons.Trash,
            action: () => removeRow(table.getRowModel().rowsById[Object.keys(rowSelection)[0]].index)
          }
        ]
      : [];

  return (
    <PathCollapsible label='Parameters' path='parameters' defaultOpen={data.length > 0} controls={tableActions}>
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
            <SelectableValidationRow row={row} colSpan={3} key={row.id} rowPathSuffix={row.original.name} title={row.original.doc}>
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
