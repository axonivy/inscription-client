import './CodeEditorCell.css';
import '../../popover/Popover.css';
import type { CellContext, RowData } from '@tanstack/react-table';
import { useEffect, useRef, useState } from 'react';
import { Popover, PopoverArrow, PopoverClose, PopoverContent, PopoverPortal, PopoverTrigger } from '@radix-ui/react-popover';
import { Fieldset, useFieldset } from '../../fieldset';
import { useEditorContext, usePath } from '../../../../context';
import { Input } from '../../input';
import { SingleLineCodeEditor } from '../../code-editor';
import type { BrowserType } from '../../../browser';
import { Browser, useBrowser } from '../../../browser';
import { useModifyEditor } from '../../code-editor/useCodeEditor';
import IvyIcon from '../../IvyIcon';
import { IvyIcons } from '@axonivy/editor-icons';

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
  browsers: BrowserType[];
};

export function CodeEditorCell<TData>({ cell, makro, type, browsers }: CodeEditorCellProps<TData>) {
  const initialValue = cell.getValue() as string;
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const [open, setOpen] = useState(false);
  const changeOpen = (open: boolean) => {
    setOpen(open);
    if (!open) {
      updateValue();
    }
  };
  const updateValue = () => {
    cell.table.options.meta?.updateData(cell.row.id, cell.column.id, value);
  };

  const editorContext = useEditorContext();
  const codeFieldset = useFieldset();
  const closeRef = useRef<HTMLButtonElement>(null);
  const path = usePath();
  const browser = useBrowser();
  const { setEditor, modifyEditor } = useModifyEditor();

  return (
    <>
      {type && type.length === 0 ? (
        <Input value={value} onChange={setValue} onBlur={() => updateValue()} />
      ) : (
        <Popover open={open} onOpenChange={changeOpen}>
          <PopoverTrigger asChild>
            <Input
              value={value}
              onChange={change => {
                setValue(change);
                setOpen(true);
              }}
              type='input'
            />
          </PopoverTrigger>
          <PopoverPortal container={editorContext.editorRef.current}>
            <PopoverContent className='popover-content' sideOffset={5} align={'end'}>
              <Fieldset label='Code' {...codeFieldset.labelProps}>
                <div className='script-input'>
                  <SingleLineCodeEditor
                    value={value}
                    onChange={setValue}
                    macro={makro}
                    context={{ type, location: path }}
                    onMountFuncs={[setEditor]}
                    editorOptions={{ fixedOverflowWidgets: false }}
                    keyActions={{
                      enter: () => closeRef.current?.click(),
                      escape: () => closeRef.current?.click(),
                      tab: () => closeRef.current?.click()
                    }}
                    {...codeFieldset.inputProps}
                  />
                  <Browser {...browser} types={browsers} accept={modifyEditor} location={path} />
                </div>
              </Fieldset>
              <PopoverClose className='popover-close' aria-label='Close' ref={closeRef}>
                <IvyIcon icon={IvyIcons.Close} />
              </PopoverClose>
              <PopoverArrow className='popover-arrow' />
            </PopoverContent>
          </PopoverPortal>
        </Popover>
      )}
    </>
  );
}
