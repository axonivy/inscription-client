import { ActionCell, ScriptCell, Table, TableAddRow, TableCell, TableFooter, TableHeader, ValidationRow } from '../../widgets';
import { PartProps, usePartDirty, usePartState } from '../../props';
import { useMailData } from './useMailData';
import { MailData } from '@axonivy/inscription-protocol';
import { PathContext, usePath, useValidations } from '../../../context';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { IvyIcons } from '@axonivy/editor-icons';

export function useMailAttachmentPart(): PartProps {
  const { config, initConfig, defaultConfig, resetAttachments } = useMailData();
  const compareData = (data: MailData) => [data.attachments];
  const validations = useValidations('attachments');
  const state = usePartState(compareData(defaultConfig), compareData(config), validations);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Attachments', state, reset: { dirty, action: () => resetAttachments() }, content: <MailAttachmentsPart /> };
}

const MailAttachmentsPart = () => {
  return (
    <PathContext path='attachments'>
      <MailAttachmentTable />
    </PathContext>
  );
};

const MailAttachmentTable = () => {
  const { config, update } = useMailData();

  const columns = useMemo<ColumnDef<string>[]>(
    () => [
      {
        id: 'attachment',
        accessorFn: row => row,
        header: () => <span>Attachments</span>,
        cell: cell => <ScriptCell cell={cell} type='Attachment' />,
        footer: props => props.column.id
      }
    ],
    []
  );

  const addRow = () => {
    update('attachments', [...config.attachments, '']);
  };

  const removeTableRow = (index: number) => {
    const newData = [...config.attachments];
    newData.splice(index, 1);
    update('attachments', newData);
  };

  const table = useReactTable({
    data: config.attachments,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowId: string, _columnId: string, value: unknown) => {
        const rowIndex = parseInt(rowId);
        const newData = [...config.attachments];
        newData.splice(rowIndex, 1, value as string);
        update('attachments', newData);
      }
    }
  });

  const validations = useValidations();
  const path = usePath();

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
            <TableHeader colSpan={1} />
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <ValidationRow key={row.id} path={`${path}.${row.index}`} validations={validations}>
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
  );
};
