import { CellContext, RowData } from '@tanstack/react-table';
import { Combobox, ComboboxItem } from '../../combobox';

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
  return <Combobox items={items} value={value} onChange={setValue} />;
}
