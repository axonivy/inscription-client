import './ReorderRow.css';
import { ReactNode, useRef } from 'react';
import { TextDropItem, useDrag, useDrop } from 'react-aria';
import IvyIcon from '../../IvyIcon';
import { IvyIcons } from '@axonivy/editor-icons';

export const ReorderRow = (props: { id: string; updateOrder: (moveId: string, targetId: string) => void; children: ReactNode }) => {
  const DND_TYPE = 'text/id';

  let { dragProps, isDragging } = useDrag({
    getItems() {
      return [{ 'text/id': props.id }];
    }
  });

  let ref = useRef(null);
  let { dropProps, isDropTarget } = useDrop({
    ref,
    getDropOperation(types, _allowedOperations) {
      return types.has(DND_TYPE) ? 'move' : 'cancel';
    },
    async onDrop(e) {
      const dndItems = e.items.filter(item => item.kind === 'text' && item.types.has(DND_TYPE));
      if (dndItems.length === 1) {
        const item = await (dndItems[0] as TextDropItem).getText(DND_TYPE);
        props.updateOrder(item, props.id);
      } else {
        console.log(`invalid drop item ${e.items[0]}`);
      }
    }
  });

  return (
    <>
      <tr {...dragProps} {...dropProps} ref={ref} className={`dnd-row${isDragging ? ' dragging' : ''}${isDropTarget ? ' target' : ''}`}>
        {props.children}
        <td className='dnd-row-handle'>
          <IvyIcon icon={IvyIcons.ChangeType} />
        </td>
      </tr>
    </>
  );
};
