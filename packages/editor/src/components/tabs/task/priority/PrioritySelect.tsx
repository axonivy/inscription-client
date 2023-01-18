import './PrioritySelect.css';
import { useMemo } from 'react';
import { PriorityLevel } from '@axonivy/inscription-protocol';
import { Select, SelectItem } from '../../../../components/widgets';
import { usePriorityData } from './usePriorityData';

const DEFAULT_PRIORITY: SelectItem = { label: PriorityLevel.NORMAL, value: 'NORMAL' };

const PrioritySelect = (props: { expiry?: boolean }) => {
  const { priority, updateLevel, updateScript } = usePriorityData(props.expiry);

  const priorityItems = useMemo<SelectItem[]>(
    () =>
      Object.entries(PriorityLevel).map(entry => {
        return { label: entry[1], value: entry[0] };
      }),
    []
  );

  const selectedItem =
    useMemo(() => priorityItems.find(e => e.value === priority?.level), [priority?.level, priorityItems]) ?? DEFAULT_PRIORITY;

  return (
    <div className='priority-select'>
      <Select label='Priority' value={selectedItem} onChange={item => updateLevel(item.value as PriorityLevel)} items={priorityItems}>
        <>
          {selectedItem?.label === PriorityLevel.SCRIPT && (
            <input className='input' value={priority?.script ?? ''} onChange={e => updateScript(e.target.value)} />
          )}
        </>
      </Select>
    </div>
  );
};

export default PrioritySelect;
