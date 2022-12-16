import { CellContext, RowData } from '@tanstack/react-table';
import React, { useEffect } from 'react';
import '../../../../style/EditableCell.css';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowId: string, columnId: string, value: unknown) => void;
  }
}

export function EditableCell<TData>(props: { cell: CellContext<TData, unknown> }) {
  const initialValue = props.cell.getValue();
  const [value, setValue] = React.useState(initialValue);
  const onBlur = () => {
    props.cell.table.options.meta?.updateData(props.cell.row.id, props.cell.column.id, value);
  };
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  return <input className='input' value={value as string} onChange={e => setValue(e.target.value)} onBlur={onBlur} />;
}
