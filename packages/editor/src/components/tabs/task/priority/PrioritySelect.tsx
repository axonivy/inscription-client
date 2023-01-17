import './PrioritySelect.css';
import { useMemo } from 'react';
import { useTaskData } from '../../../../context';
import { PriorityLevel } from '@axonivy/inscription-protocol';
import { Select, SelectItem } from '../../../../components/widgets';

const DEFAULT_PRIORITY: SelectItem = { label: PriorityLevel.NORMAL, value: 'NORMAL' };

const PrioritySelect = (props: {
  levelPath: 'priority/level' | 'expiry/priority/level';
  scriptPath: 'priority/script' | 'expiry/priority/script';
}) => {
  const [, level, setLevel] = useTaskData(props.levelPath);
  const [, script, setScript] = useTaskData(props.scriptPath);

  const priorityItems = useMemo<SelectItem[]>(
    () =>
      Object.entries(PriorityLevel).map(entry => {
        return { label: entry[1], value: entry[0] };
      }),
    []
  );

  const selectedItem = useMemo(() => priorityItems.find(e => e.value === level), [level, priorityItems]) ?? DEFAULT_PRIORITY;

  return (
    <div className='priority-select'>
      <Select label='Priority' value={selectedItem} onChange={item => setLevel(item.value as PriorityLevel)} items={priorityItems}>
        <>
          {selectedItem?.label === PriorityLevel.SCRIPT && (
            <input className='input' value={script ?? ''} onChange={e => setScript(e.target.value)} />
          )}
        </>
      </Select>
    </div>
  );
};

export default PrioritySelect;
