import './EditableCell.css';
import { CellContext, RowData } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { Input } from '../../input';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowId: string, columnId: string, value: unknown) => void;
  }
}

type EditableCellProps<TData> = { cell: CellContext<TData, unknown>; disabled?: boolean };

export function EditableCell<TData>({ cell, disabled }: EditableCellProps<TData>) {
  const initialValue = cell.getValue();
  const [value, setValue] = useState(initialValue);
  const onBlur = () => {
    cell.table.options.meta?.updateData(cell.row.id, cell.column.id, value);
  };
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <Input value={value as string} onChange={change => setValue(change)} onBlur={onBlur} disabled={disabled} />;
}
