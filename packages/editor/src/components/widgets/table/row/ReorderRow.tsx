import './ReorderRow.css';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import type { TextDropItem } from 'react-aria';
import { useDrag, useDrop } from 'react-aria';
import type { MessageTextProps } from '../../message/Message';
import { MessageRow, styleMessageRow, type MessageRowProps } from './MessageRow';
import { SelectRow, type SelectRowProps } from './SelectRow';
import IvyIcon from '../../IvyIcon';
import { IvyIcons } from '@axonivy/ui-icons';

export type ReorderRowProps = {
  id: string;
  updateOrder: (moveId: string, targetId: string) => void;
  children: ReactNode;
};

export const SelectableReorderRow = <TData extends object>({
  id,
  updateOrder,
  children,
  message,
  colSpan,
  row,
  title,
  onDoubleClick,
  ...props
}: ReorderRowProps & MessageTextProps & SelectRowProps<TData> & MessageRowProps) => {
  const DND_TYPE = 'text/id';

  const { dragProps, isDragging } = useDrag({
    getItems() {
      return [{ 'text/id': id }];
    }
  });

  const ref = useRef(null);
  const { dropProps, isDropTarget } = useDrop({
    ref,
    getDropOperation(types) {
      return types.has(DND_TYPE) ? 'move' : 'cancel';
    },
    async onDrop(e) {
      const dndItems = e.items.filter(item => item.kind === 'text' && item.types.has(DND_TYPE));
      if (dndItems.length === 1) {
        const item = await (dndItems[0] as TextDropItem).getText(DND_TYPE);
        updateOrder(item, id);
      } else {
        console.log(`invalid drop item ${e.items[0]}`);
      }
      if (!row.getIsSelected()) {
        row.getToggleSelectedHandler()(e);
      }
    }
  });

  return (
    <>
      <SelectRow
        {...dragProps}
        {...dropProps}
        row={row}
        onDoubleClick={onDoubleClick}
        onClick={e => {
          if (!row.getIsSelected()) {
            row.getToggleSelectedHandler()(e);
          }
        }}
        title={title}
        className={`dnd-row${isDragging ? ' dragging' : ''}${isDropTarget ? ' target' : ''} ${styleMessageRow(message)}`}
        {...props}
      >
        {children}
      </SelectRow>
      <MessageRow colSpan={colSpan ? colSpan : 2} message={message} />
    </>
  );
};

export const ReorderWrapperIcon = ({ children }: React.HTMLAttributes<HTMLTableCellElement>) => (
  <div className='reorder-select-icon'>
    {children}
    <div className='dnd-row-handle'>
      <IvyIcon icon={IvyIcons.ChangeType} />
    </div>
  </div>
);
