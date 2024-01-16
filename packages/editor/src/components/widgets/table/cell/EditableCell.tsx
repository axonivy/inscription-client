import './EditableCell.css';
import '../../code-editor/ScriptInput.css';
import type { CellContext, RowData } from '@tanstack/react-table';
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

type EditableCellProps<TData> = {
  cell: CellContext<TData, unknown>;
  disabled?: boolean;
  withBrowser?: boolean;
  placeholder?: string;
};

export function EditableCell<TData>({ cell, disabled, withBrowser: propWithBrowser, placeholder }: EditableCellProps<TData>) {
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

  useEffect(() => {
    if (isFocusWithin && !cell.row.getIsSelected()) {
      cell.row.toggleSelected();
    }
  }, [cell.row, isFocusWithin]);

  const updateValue = (value: string) => {
    setValue(value);
    cell.table.options.meta?.updateData(cell.row.id, cell.column.id, value);
  };

  return withBrowser ? (
    <div className='editableCell-with-browser' {...focusWithinProps} tabIndex={1}>
      {isFocusWithin || browser.open ? (
        <>
          <Input {...focusValue} value={value as string} onChange={change => setValue(change)} onBlur={onBlur} disabled={disabled} />
          <Browser {...browser} types={['type']} accept={change => updateValue(change.cursorValue)} location={path} />
        </>
      ) : (
        <Input value={value as string} onChange={change => setValue(change)} onBlur={onBlur} disabled={disabled} />
      )}
    </div>
  ) : (
    <div {...focusWithinProps} tabIndex={1} aria-label={value as string}>
      <Input
        {...focusValue}
        value={value as string}
        onChange={change => setValue(change)}
        onBlur={onBlur}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  );
}
