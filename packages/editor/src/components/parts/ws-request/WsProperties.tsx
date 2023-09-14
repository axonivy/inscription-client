import { useEffect, useMemo, useState } from 'react';
import { PathCollapsible, ValidationRow } from '../common';
import { useWsRequestData } from './useWsRequestData';
import { ColumnDef, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import {
  ActionCell,
  ScriptCell,
  SelectCell,
  SelectItem,
  SortableHeader,
  Table,
  TableAddRow,
  TableCell,
  TableFooter,
  TableHeader
} from '../../../components/widgets';
import { useEditorContext, useMeta } from '../../../context';
import { WsProperty } from './properties';
import { IvyIcons } from '@axonivy/editor-icons';
import { IVY_SCRIPT_TYPES } from '@axonivy/inscription-protocol';

export const WsProperties = () => {
  const { config, update } = useWsRequestData();
  const [data, setData] = useState<WsProperty[]>([]);
  useEffect(() => {
    setData(WsProperty.of(config.properties));
  }, [config.properties]);

  const onChange = (props: WsProperty[]) => update('properties', WsProperty.to(props));

  const { context } = useEditorContext();
  const knownProperties = useMeta('meta/webservice/properties', { clientId: config.clientId, context }, []).data.map<SelectItem>(prop => {
    return { label: prop, value: prop };
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const columns = useMemo<ColumnDef<WsProperty>[]>(
    () => [
      {
        accessorKey: 'name',
        header: header => <SortableHeader header={header} name='Name' />,
        cell: cell => <SelectCell cell={cell} items={knownProperties} />
      },
      {
        accessorKey: 'expression',
        header: header => <SortableHeader header={header} name='Expression' />,
        cell: cell => <ScriptCell cell={cell} type={IVY_SCRIPT_TYPES.OBJECT} />
      }
    ],
    [knownProperties]
  );

  const addRow = () => {
    const newData = [...data];
    newData.push({ name: '', expression: '' });
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
        onChange(WsProperty.update(data, rowIndex, columnId, value as string));
      }
    }
  });
  return (
    <PathCollapsible label='Properties' path='properties' defaultOpen={Object.keys(config.properties).length > 0}>
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
            <ValidationRow key={row.id} rowPathSuffix={row.original.name}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
              <ActionCell actions={[{ label: 'Remove row', icon: IvyIcons.Delete, action: () => removeTableRow(row.index) }]} />
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
