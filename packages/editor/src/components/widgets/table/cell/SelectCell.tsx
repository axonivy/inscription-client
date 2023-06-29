import './SelectCell.css';
import { CellContext, RowData } from '@tanstack/react-table';
import Select, { SelectItem } from '../../select/Select';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowId: string, columnId: string, value: unknown) => void;
  }
}

export function SelectCell<TData>({ cell, items }: { cell: CellContext<TData, unknown>; items: SelectItem[] }) {
  const value = cell.getValue() as string;
  const setValue = (item: SelectItem) => {
    cell.table.options.meta?.updateData(cell.row.id, cell.column.id, item.value);
  };
  return <Select items={items} value={{ label: value, value: value }} onChange={setValue} />;
}
