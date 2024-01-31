import './ReorderRow.css';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import type { TextDropItem } from 'react-aria';
import { useDrag, useDrop } from 'react-aria';
import IvyIcon from '../../IvyIcon';
import { IvyIcons } from '@axonivy/editor-icons';
import type { MessageTextProps } from '../../message/Message';
import { MessageRowWithTr } from './MessageRow';

export type ReorderRowProps = {
  id: string;
  updateOrder: (moveId: string, targetId: string) => void;
  children: ReactNode;
};

export const ReorderRow = ({ id, updateOrder, children, ...props }: ReorderRowProps & MessageTextProps) => {
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
    }
  });

  return (
    <MessageRowWithTr
      {...dragProps}
      {...dropProps}
      ref={ref}
      colSpan={2}
      className={`dnd-row${isDragging ? ' dragging' : ''}${isDropTarget ? ' target' : ''}`}
      {...props}
    >
      {children}
      <td className='dnd-row-handle'>
        <IvyIcon icon={IvyIcons.ChangeType} />
      </td>
    </MessageRowWithTr>
  );
};
