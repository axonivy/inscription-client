import './SelectRow.css';
import { Row } from '@tanstack/react-table';
import { ReactNode } from 'react';

type SelectRowProps<TData> = {
  row: Row<TData>;
  children: ReactNode;
  isNotSelectable?: boolean;
};

export const SelectRow = <TData extends object>({ row, children, isNotSelectable }: SelectRowProps<TData>) => (
  <tr
    className={isNotSelectable ? '' : 'selectable-row'}
    data-state={row.getIsSelected() ? 'selected' : ''}
    onClick={isNotSelectable ? undefined : row.getToggleSelectedHandler()}
  >
    {children}
  </tr>
);
