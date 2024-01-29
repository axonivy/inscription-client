import { useEffect, useMemo, useState } from 'react';
import { ValidationRow } from '../';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import type { ComboboxItem } from '../../../../components/widgets';
import {
  ActionCell,
  ComboCell,
  ScriptCell,
  SortableHeader,
  Table,
  TableAddRow,
  TableCell,
  TableHeader
} from '../../../../components/widgets';
import { Property } from './properties';
import { IvyIcons } from '@axonivy/editor-icons';
import type { ScriptMappings } from '@axonivy/inscription-protocol';
import { IVY_SCRIPT_TYPES } from '@axonivy/inscription-protocol';

type PropertyTableProps = {
  properties: ScriptMappings;
  update: (change: ScriptMappings) => void;
  knownProperties: string[];
  hideProperties?: string[];
};

export const PropertyTable = ({ properties, update, knownProperties, hideProperties }: PropertyTableProps) => {
  const [data, setData] = useState<Property[]>([]);
  useEffect(() => {
    setData(Property.of(properties));
  }, [properties]);

  const onChange = (props: Property[]) => update(Property.to(props));

  const knownPropertyItems = knownProperties.map<ComboboxItem>(prop => ({ value: prop }));

  const [sorting, setSorting] = useState<SortingState>([]);
  const columns = useMemo<ColumnDef<Property>[]>(
    () => [
      {
        accessorKey: 'name',
        header: header => <SortableHeader header={header} name='Name' />,
        cell: cell => <ComboCell cell={cell} items={knownPropertyItems} />
      },
      {
        accessorKey: 'expression',
        header: header => <SortableHeader header={header} name='Expression' />,
        cell: cell => <ScriptCell cell={cell} type={IVY_SCRIPT_TYPES.OBJECT} browsers={['attr', 'func', 'type', 'cms']} />
      }
    ],
    [knownPropertyItems]
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
        onChange(Property.update(data, rowIndex, columnId, value as string));
      }
    }
  });
  return (
    <>
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
          {table.getRowModel().rows.map(row => {
            if (hideProperties?.includes(row.original.name)) {
              return null;
            }
            return (
              <ValidationRow colSpan={3} key={row.id} rowPathSuffix={row.original.name}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
                <ActionCell actions={[{ label: 'Remove row', icon: IvyIcons.Trash, action: () => removeTableRow(row.index) }]} />
              </ValidationRow>
            );
          })}
        </tbody>
      </Table>
      <TableAddRow addRow={addRow} />
    </>
  );
};
