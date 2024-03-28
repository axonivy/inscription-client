import './CodeEditorCell.css';
import type { CellContext, RowData } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { usePath } from '../../../../context';
import { Input } from '../../input';
import { SingleLineCodeEditor } from '../../code-editor';
import type { BrowserType } from '../../../browser';
import { Browser, useBrowser } from '../../../browser';
import { useMonacoEditor } from '../../code-editor/useCodeEditor';
import { useOnFocus } from '../../../browser/useOnFocus';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowId: string, columnId: string, value: unknown) => void;
  }
}

type CodeEditorCellProps<TData> = {
  cell: CellContext<TData, unknown>;
  makro: boolean;
  type?: string;
  placeholder?: string;
  browsers: BrowserType[];
};

export function CodeEditorCell<TData>({ cell, makro, type, browsers, placeholder }: CodeEditorCellProps<TData>) {
  const initialValue = cell.getValue() as string;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const { setEditor, modifyEditor } = useMonacoEditor();
  const path = usePath();
  const browser = useBrowser();

  const updateValue = (newValue: string) => {
    setValue(newValue);
    if (!browser.open && newValue !== cell.getValue()) {
      cell.table.options.meta?.updateData(cell.row.id, cell.column.id, newValue);
    }
  };

  const { isFocusWithin, focusWithinProps, focusValue } = useOnFocus(value, updateValue);

  useEffect(() => {
    if (isFocusWithin && !cell.row.getIsSelected()) {
      cell.row.toggleSelected();
    }
  }, [cell.row, isFocusWithin]);

  const activeElementBlur = () => {
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  };

  return (
    <div className='script-input' {...focusWithinProps} tabIndex={1}>
      {isFocusWithin || browser.open ? (
        <>
          <SingleLineCodeEditor
            {...focusValue}
            context={{ type, location: path }}
            keyActions={{
              enter: activeElementBlur,
              escape: activeElementBlur
            }}
            onMountFuncs={[setEditor]}
            macro={makro}
          />
          <Browser {...browser} types={browsers} accept={modifyEditor} location={path} />
        </>
      ) : (
        <Input value={value} onChange={setValue} placeholder={placeholder} onBlur={() => updateValue(value)} />
      )}
    </div>
  );
}
