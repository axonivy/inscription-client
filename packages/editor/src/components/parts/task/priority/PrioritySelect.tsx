import './PrioritySelect.css';
import { useMemo } from 'react';
import type { WfPriority, WfLevel, WfTask } from '@axonivy/inscription-protocol';
import { PRIORITY_LEVEL, IVY_SCRIPT_TYPES } from '@axonivy/inscription-protocol';
import type { SelectItem } from '../../../../components/widgets';
import { ScriptInput, Select } from '../../../../components/widgets';
import type { DataUpdater } from '../../../../types/lambda';
import { PathCollapsible, ValidationFieldset } from '../../common';
import { Flex } from '@axonivy/ui-components';

const DEFAULT_PRIORITY: SelectItem & { value: WfLevel } = { label: PRIORITY_LEVEL.NORMAL, value: 'NORMAL' };

export type PriorityUpdater = DataUpdater<WfTask['priority']>;

type PrioritySelectProps = { priority?: WfPriority; updatePriority: PriorityUpdater };

const PrioritySelect = ({ priority, updatePriority }: PrioritySelectProps) => {
  const priorityItems = useMemo<SelectItem[]>(() => Object.entries(PRIORITY_LEVEL).map(([value, label]) => ({ label, value })), []);
  const selectedLevel = useMemo<SelectItem>(
    () => priorityItems.find(e => e.value === priority?.level) ?? DEFAULT_PRIORITY,
    [priority?.level, priorityItems]
  );

  return (
    <PathCollapsible label='Priority' path='priority' defaultOpen={priority?.level !== 'NORMAL'}>
      <ValidationFieldset>
        <Flex direction='row' gap={2} className='priority-select'>
          <Select value={selectedLevel} onChange={item => updatePriority('level', item.value as WfLevel)} items={priorityItems} />
          {(selectedLevel.value as WfLevel) === 'SCRIPT' && (
            <ScriptInput
              type={IVY_SCRIPT_TYPES.INT}
              value={priority?.script ?? ''}
              onChange={change => updatePriority('script', change)}
              browsers={['attr', 'func', 'type']}
            />
          )}
        </Flex>
      </ValidationFieldset>
    </PathCollapsible>
  );
};

export default PrioritySelect;
