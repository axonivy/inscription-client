import './SelectRow.js';
import type { Row } from '@tanstack/react-table';
import type { ReactNode } from 'react';

type SelectRowProps<TData> = {
  row: Row<TData>;
  children: ReactNode;
  isNotSelectable?: boolean;
  onDoubleClick?: () => void;
};

export const SelectRow = <TData extends object>({ row, children, isNotSelectable, onDoubleClick }: SelectRowProps<TData>) => (
  <tr
    className={isNotSelectable ? '' : 'selectable-row'}
    data-state={row.getIsSelected() ? 'selected' : ''}
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
