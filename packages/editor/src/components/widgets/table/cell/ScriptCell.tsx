import './ScriptCell.css';
import '../../popover/Popover.css';
import { CellContext, RowData } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { Popover, PopoverArrow, PopoverClose, PopoverContent, PopoverPortal, PopoverTrigger } from '@radix-ui/react-popover';
import { Fieldset, useFieldset } from '../../fieldset';
import IvyIcon from '../../IvyIcon';
import { useEditorContext } from '../../../../context';
import { IvyIcons } from '@axonivy/editor-icons';
import { Input } from '../../input';
import { ScriptInput } from '../../code-editor';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowId: string, columnId: string, value: unknown) => void;
  }
}

type ScriptCellProps<TData> = {
  cell: CellContext<TData, unknown>;
  context: { type: string; location: string };
};

export function ScriptCell<TData>({ cell, context }: ScriptCellProps<TData>) {
  const initialValue = cell.getValue();
  const [value, setValue] = useState(initialValue);
  const updateValue = (open: boolean) => {
    if (!open) {
      cell.table.options.meta?.updateData(cell.row.id, cell.column.id, value);
    }
  };
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const editorContext = useEditorContext();
  const codeFieldset = useFieldset();

  return (
    <>
      {context.type.length === 0 ? (
        <Input value={value as string} onChange={setValue} onBlur={() => updateValue(false)} />
      ) : (
        <Popover onOpenChange={updateValue}>
          <PopoverTrigger asChild>
            <Input value={value as string} onChange={setValue} type='input' />
          </PopoverTrigger>
          <PopoverPortal container={editorContext.editorRef.current}>
            <PopoverContent className='popover-content' sideOffset={5} align={'end'}>
              <Fieldset label='Code' {...codeFieldset.labelProps}>
                <ScriptInput
                  value={value as string}
                  onChange={setValue}
                  location={`${context.location}&type=${context.type}`}
                  {...codeFieldset.inputProps}
                />
              </Fieldset>
              <PopoverClose className='popover-close' aria-label='Close'>
                <IvyIcon icon={IvyIcons.Add} rotate={45} />
              </PopoverClose>
              <PopoverArrow className='popover-arrow' />
            </PopoverContent>
          </PopoverPortal>
        </Popover>
      )}
    </>
  );
}
