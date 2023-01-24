import './PrioritySelect.css';
import { useMemo } from 'react';
import { Priority, PriorityLevel } from '@axonivy/inscription-protocol';
import { Select, SelectItem } from '../../../../components/widgets';
import { Consumer } from '../../../../types/lambda';

const DEFAULT_PRIORITY: SelectItem = { label: PriorityLevel.NORMAL, value: 'NORMAL' };

export interface PriorityUpdater {
  updateLevel: Consumer<PriorityLevel>;
  updateScript: Consumer<string>;
}

const PrioritySelect = (props: { priority?: Priority; updatePriority: PriorityUpdater }) => {
  const priorityItems = useMemo<SelectItem[]>(
    () =>
      Object.entries(PriorityLevel).map(entry => {
        return { label: entry[1], value: entry[0] };
      }),
    []
  );

  const selectedItem =
    useMemo(() => priorityItems.find(e => e.value === props.priority?.level), [props.priority?.level, priorityItems]) ?? DEFAULT_PRIORITY;

  return (
    <div className='priority-select'>
      <Select
        label='Priority'
        value={selectedItem}
        onChange={item => props.updatePriority.updateLevel(item.value as PriorityLevel)}
        items={priorityItems}
      >
        <>
          {selectedItem?.label === PriorityLevel.SCRIPT && (
            <input
              className='input'
              value={props.priority?.script ?? ''}
              onChange={e => props.updatePriority.updateScript(e.target.value)}
            />
          )}
        </>
      </Select>
    </div>
  );
};

export default PrioritySelect;
