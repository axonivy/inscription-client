import './SelectRow.css';
import type { Row } from '@tanstack/react-table';
import type { ReactNode } from 'react';

export type SelectRowProps<TData> = {
  row: Row<TData>;
  children: ReactNode;
  title?: string;
  isNotSelectable?: boolean;
  onDoubleClick?: () => void;
};

export const SelectRow = <TData extends object>({ row, children, title, isNotSelectable, onDoubleClick }: SelectRowProps<TData>) => (
  <tr
    className={isNotSelectable ? '' : 'selectable-row'}
    data-state={row.getIsSelected() ? 'selected' : ''}
    title={title}
    onClick={event => {
      if (!isNotSelectable) {
        if (event.detail === 1) {
          if (!row.getIsSelected()) {
            row.getToggleSelectedHandler()(event);
          }
        } else if (onDoubleClick) {
          onDoubleClick();
        }
      }
    }}
  >
    {children}
  </tr>
);
