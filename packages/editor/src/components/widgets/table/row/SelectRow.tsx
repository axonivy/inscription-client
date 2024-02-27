import './SelectRow.css';
import type { Row } from '@tanstack/react-table';
import { type ComponentProps, type ReactNode } from 'react';

export type SelectRowProps<TData> = ComponentProps<'tr'> & {
  row: Row<TData>;
  children: ReactNode;
  title?: string;
  isNotSelectable?: boolean;
  onDoubleClick?: () => void;
};

export const SelectRow = <TData extends object>({
  row,
  children,
  title,
  isNotSelectable,
  onDoubleClick,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement> & SelectRowProps<TData>) => {
  const selectRow = () => {
    if (!row.getIsSelected()) {
      row.toggleSelected();
    }
  };
  return (
    <tr
      className={`${isNotSelectable ? '' : 'selectable-row'} ${className}`}
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
      onFocus={() => selectRow()}
      {...props}
    >
      {children}
    </tr>
  );
};
