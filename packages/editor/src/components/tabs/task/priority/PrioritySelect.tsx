import './PrioritySelect.css';
import { useMemo } from 'react';
import { Priority, PriorityLevel, PRIORITY_LEVEL } from '@axonivy/inscription-protocol';
import { Select, SelectItem } from '../../../../components/widgets';

interface PrioritySelectItem extends SelectItem {
  value: PriorityLevel;
}

const DEFAULT_PRIORITY: PrioritySelectItem = { label: PRIORITY_LEVEL.NORMAL, value: 'NORMAL' };

export interface PriorityUpdater {
  updateLevel: (level: PriorityLevel) => void;
  updateScript: (script: string) => void;
}

const PriorityScript = (props: { priority?: Priority; updatePriority: PriorityUpdater; selectedLevel: PriorityLevel }) => {
  if (props.selectedLevel === 'SCRIPT') {
    return (
      <input className='input' value={props.priority?.script ?? ''} onChange={e => props.updatePriority.updateScript(e.target.value)} />
    );
  }
  return <></>;
};

const PrioritySelect = (props: { priority?: Priority; updatePriority: PriorityUpdater }) => {
  const priorityItems = useMemo<SelectItem[]>(() => Object.entries(PRIORITY_LEVEL).map(([value, label]) => ({ label, value })), []);
  const selectedLevel =
    useMemo(() => priorityItems.find(e => e.value === props.priority?.level), [props.priority?.level, priorityItems]) ?? DEFAULT_PRIORITY;

  return (
    <div className='priority-select'>
      <Select
        label='Priority'
        value={selectedLevel}
        onChange={item => props.updatePriority.updateLevel(item.value as PriorityLevel)}
        items={priorityItems}
      >
        <PriorityScript {...props} selectedLevel={selectedLevel.value as PriorityLevel} />
      </Select>
    </div>
  );
};

export default PrioritySelect;
