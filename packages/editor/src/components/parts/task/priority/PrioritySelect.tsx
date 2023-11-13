import './PrioritySelect.css';
import { useMemo } from 'react';
import type { WfPriority, WfLevel, WfTask} from '@axonivy/inscription-protocol';
import { PRIORITY_LEVEL, IVY_SCRIPT_TYPES } from '@axonivy/inscription-protocol';
import type { SelectItem} from '../../../../components/widgets';
import { ScriptInput, Select, useFieldset } from '../../../../components/widgets';
import type { DataUpdater } from '../../../../types/lambda';
import { PathFieldset } from '../../common';

const DEFAULT_PRIORITY: SelectItem & { value: WfLevel } = { label: PRIORITY_LEVEL.NORMAL, value: 'NORMAL' };

export type PriorityUpdater = DataUpdater<WfTask['priority']>;

const PrioritySelect = ({ priority, updatePriority }: { priority?: WfPriority; updatePriority: PriorityUpdater }) => {
  const priorityItems = useMemo<SelectItem[]>(() => Object.entries(PRIORITY_LEVEL).map(([value, label]) => ({ label, value })), []);
  const selectedLevel = useMemo<SelectItem>(
    () => priorityItems.find(e => e.value === priority?.level) ?? DEFAULT_PRIORITY,
    [priority?.level, priorityItems]
  );

  const selectFieldset = useFieldset();

  return (
    <PathFieldset label='Priority' {...selectFieldset.labelProps} path='priority'>
      <div className='priority-select'>
        <Select
          value={selectedLevel}
          onChange={item => updatePriority('level', item.value as WfLevel)}
          items={priorityItems}
          inputProps={selectFieldset.inputProps}
        />
        {(selectedLevel.value as WfLevel) === 'SCRIPT' && (
          <ScriptInput
            type={IVY_SCRIPT_TYPES.INT}
            value={priority?.script ?? ''}
            onChange={change => updatePriority('script', change)}
            browsers={['attr', 'func', 'datatype']}
          />
        )}
      </div>
    </PathFieldset>
  );
};

export default PrioritySelect;
