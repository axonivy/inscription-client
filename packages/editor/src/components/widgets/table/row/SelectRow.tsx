import './SelectRow.css';
import type { Row } from '@tanstack/react-table';
import type { ReactNode } from 'react';
import Button from '../../button/Button';
import { IvyIcons } from '@axonivy/editor-icons';

type SelectRowProps<TData> = {
  row: Row<TData>;
  children: ReactNode;
  isNotSelectable?: boolean;
  onDoubleClick?: () => void;
  removeRow?: () => void;
};

export const SelectRow = <TData extends object>({ row, children, isNotSelectable, onDoubleClick, removeRow }: SelectRowProps<TData>) => (
  <>
    {row.getIsSelected() && removeRow && (
      <tr>
        <td style={{ borderTop: 'none', padding: '0px', height: '0px' }}>
          <div className='remove-row'>
            <Button icon={IvyIcons.Plus} rotate={45} onClick={removeRow} />
          </div>
        </td>
      </tr>
    )}
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
  </>
);
