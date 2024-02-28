import type { CellContext, RowData } from '@tanstack/react-table';
import type { ComboboxItem } from '../../combobox';
import { Combobox } from '../../combobox';
import { useOnFocus } from '../../../browser/useOnFocus';
import { useEffect } from 'react';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowId: string, columnId: string, value: unknown) => void;
  }
}

export function ComboCell<TData>({ cell, items }: { cell: CellContext<TData, unknown>; items: ComboboxItem[] }) {
  const value = cell.getValue() as string;
  const setValue = (value: string) => {
    cell.table.options.meta?.updateData(cell.row.id, cell.column.id, value);
  };
  const { isFocusWithin, focusWithinProps, focusValue } = useOnFocus(value as string, change => setValue(change as string));

  useEffect(() => {
    if (isFocusWithin && !cell.row.getIsSelected()) {
      cell.row.toggleSelected();
    }
  }, [cell.row, isFocusWithin]);

  return (
    <div {...focusWithinProps}>
      <Combobox items={items} value={focusValue.value} onChange={focusValue.onChange} updateOnInputChange={true} />
    </div>
  );
}
