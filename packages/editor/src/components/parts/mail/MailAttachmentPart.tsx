import { Fieldset, ScriptCell, Table, TableAddRow, TableCell } from '../../widgets';
import type { PartProps } from '../../editors';
import { usePartDirty, usePartState } from '../../editors';
import { useMailData } from './useMailData';
import type { MailData } from '@axonivy/inscription-protocol';
import { PathContext, useValidations } from '../../../context';
import type { ColumnDef } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { SelectableValidationRow } from '../common';
import { useResizableEditableTable } from '../common/table/useResizableEditableTable';

export function useMailAttachmentPart(): PartProps {
  const { config, initConfig, defaultConfig, resetAttachments } = useMailData();
  const compareData = (data: MailData) => [data.attachments];
  const validations = useValidations(['attachments']);
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
  type MailAttachment = { attachment: string };
  const [data, setData] = useState<MailAttachment[]>(config.attachments.map(filename => ({ attachment: filename })));

  const columns = useMemo<ColumnDef<MailAttachment>[]>(
    () => [
      {
        id: 'attachment',
        accessorFn: row => row.attachment,
        cell: cell => (
          <ScriptCell cell={cell} type='Attachment' browsers={['attr', 'func', 'type', 'cms']} placeholder={'Enter the Attachment'} />
        )
      }
    ],
    []
  );

  const onChange = (change: MailAttachment[]) => {
    setData(change);
    const mappedData: string[] = change.map(attachment => attachment.attachment);
    update('attachments', mappedData);
  };

  const { table, setRowSelection, addRow, removeRowAction, showAddButton } = useResizableEditableTable({
    data,
    columns,
    onChange,
    emptyDataObject: { attachment: '' }
  });

  const tableActions = table.getSelectedRowModel().rows.length > 0 ? [removeRowAction] : [];

  return (
    <>
      <div>
        <Fieldset
          label='Attachments'
          controls={tableActions}
          onClick={() => {
            setRowSelection({});
          }}
        />
        {table.getRowModel().rows.length > 0 && (
          <Table>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <SelectableValidationRow row={row} colSpan={1} key={row.id} rowPathSuffix={row.index}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </SelectableValidationRow>
              ))}
            </tbody>
          </Table>
        )}
      </div>
      {showAddButton() && <TableAddRow addRow={addRow} />}
    </>
  );
};
