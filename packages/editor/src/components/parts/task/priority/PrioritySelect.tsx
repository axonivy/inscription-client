import './PrioritySelect.css';
import { useMemo } from 'react';
import { WfPriority, WfLevel, PRIORITY_LEVEL } from '@axonivy/inscription-protocol';
import { Select, SelectItem } from '../../../../components/widgets';
import { Consumer } from '../../../../types/lambda';

const DEFAULT_PRIORITY: SelectItem & { value: WfLevel } = { label: PRIORITY_LEVEL.NORMAL, value: 'NORMAL' };

export interface PriorityUpdater {
  updateLevel: Consumer<WfLevel>;
  updateScript: Consumer<string>;
}

const PriorityScript = (props: { priority?: WfPriority; updatePriority: PriorityUpdater; selectedLevel: WfLevel }) => {
  if (props.selectedLevel === 'SCRIPT') {
    return (
      <input className='input' value={props.priority?.script ?? ''} onChange={e => props.updatePriority.updateScript(e.target.value)} />
    );
  }
  return <></>;
};

const PrioritySelect = (props: { priority?: WfPriority; updatePriority: PriorityUpdater }) => {
  const priorityItems = useMemo<SelectItem[]>(() => Object.entries(PRIORITY_LEVEL).map(([value, label]) => ({ label, value })), []);
  const selectedLevel = useMemo<SelectItem>(
    () => priorityItems.find(e => e.value === props.priority?.level) ?? DEFAULT_PRIORITY,
    [props.priority?.level, priorityItems]
  );

  return (
    <div className='priority-select'>
      <Select
        label='Priority'
        value={selectedLevel}
        onChange={item => props.updatePriority.updateLevel(item.value as WfLevel)}
        items={priorityItems}
      >
        <PriorityScript {...props} selectedLevel={selectedLevel.value as WfLevel} />
      </Select>
    </div>
  );
};

export default PrioritySelect;
