import './SelectCell.css';
import { CellContext, RowData } from '@tanstack/react-table';
import Select, { SelectItem } from '../../select/Select';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowId: string, columnId: string, value: unknown) => void;
  }
}

export function SelectCell<TData>(props: { cell: CellContext<TData, unknown>; items: SelectItem[] }) {
  const value = props.cell.getValue() as string;
  const setValue = (item: SelectItem) => {
    props.cell.table.options.meta?.updateData(props.cell.row.id, props.cell.column.id, item.value);
  };
  return <Select label='' items={props.items} value={{ label: value, value: value }} onChange={setValue} />;
}
