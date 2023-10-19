import './EditableCell.css';
import '../../code-editor/ScriptInput.css';
import { CellContext, RowData } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { Input } from '../../input';
import { Browser, useBrowser } from '../../../../components/browser';
import { usePath } from '../../../../context';
import { useOnFocus } from '../../../../components/browser/useOnFocus';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowId: string, columnId: string, value: unknown) => void;
  }
}

type EditableCellProps<TData> = { cell: CellContext<TData, unknown>; disabled?: boolean; withBrowser?: boolean };

export function EditableCell<TData>({ cell, disabled, withBrowser: propWithBrowser }: EditableCellProps<TData>) {
  const initialValue = cell.getValue();
  const [value, setValue] = useState(initialValue);
  const browser = useBrowser();
  const path = usePath();
  const withBrowser = propWithBrowser || false;
  const { isFocusWithin, focusWithinProps, focusValue } = useOnFocus(value as string, change => setValue(change));
  const onBlur = () => {
    cell.table.options.meta?.updateData(cell.row.id, cell.column.id, value);
  };
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return withBrowser ? (
    <div className='editableCell-with-browser' {...focusWithinProps} tabIndex={1}>
      {isFocusWithin || browser.open ? (
        <>
          <Input {...focusValue} value={value as string} onChange={change => setValue(change)} onBlur={onBlur} disabled={disabled} />
          <Browser {...browser} types={['datatype']} accept={change => setValue(change)} location={path} />
        </>
      ) : (
        <Input value={value as string} onChange={change => setValue(change)} onBlur={onBlur} disabled={disabled} />
      )}
    </div>
  ) : (
    <Input value={value as string} onChange={change => setValue(change)} onBlur={onBlur} disabled={disabled} />
  );
}
