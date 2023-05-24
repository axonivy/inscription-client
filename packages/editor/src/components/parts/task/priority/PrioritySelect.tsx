import './PrioritySelect.css';
import { useMemo } from 'react';
import { WfPriority, WfLevel, PRIORITY_LEVEL } from '@axonivy/inscription-protocol';
import { Fieldset, Input, Select, SelectItem, useFieldset } from '../../../../components/widgets';
import { Consumer } from '../../../../types/lambda';

const DEFAULT_PRIORITY: SelectItem & { value: WfLevel } = { label: PRIORITY_LEVEL.NORMAL, value: 'NORMAL' };

export interface PriorityUpdater {
  updateLevel: Consumer<WfLevel>;
  updateScript: Consumer<string>;
}

const PrioritySelect = ({ priority, updatePriority }: { priority?: WfPriority; updatePriority: PriorityUpdater }) => {
  const priorityItems = useMemo<SelectItem[]>(() => Object.entries(PRIORITY_LEVEL).map(([value, label]) => ({ label, value })), []);
  const selectedLevel = useMemo<SelectItem>(
    () => priorityItems.find(e => e.value === priority?.level) ?? DEFAULT_PRIORITY,
    [priority?.level, priorityItems]
  );

  const selectFieldset = useFieldset();

  return (
    <Fieldset label='Priority' {...selectFieldset.labelProps}>
      <div className='priority-select'>
        <Select
          value={selectedLevel}
          onChange={item => updatePriority.updateLevel(item.value as WfLevel)}
          items={priorityItems}
          inputProps={selectFieldset.inputProps}
        />
        {(selectedLevel.value as WfLevel) === 'SCRIPT' && (
          <Input value={priority?.script} onChange={change => updatePriority.updateScript(change)} />
        )}
      </div>
    </Fieldset>
  );
};

export default PrioritySelect;
