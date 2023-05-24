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

export function EditableCell<TData>(props: { cell: CellContext<TData, unknown> }) {
  const initialValue = props.cell.getValue();
  const [value, setValue] = useState(initialValue);
  const onBlur = () => {
    props.cell.table.options.meta?.updateData(props.cell.row.id, props.cell.column.id, value);
  };
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <Input value={value as string} onChange={change => setValue(change)} onBlur={onBlur} />;
}
