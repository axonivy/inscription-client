import './ResponsibleSelect.css';
import { useMemo } from 'react';
import type { WfActivator, WfActivatorType, WfTask } from '@axonivy/inscription-protocol';
import { RESPONSIBLE_TYPE, IVY_SCRIPT_TYPES } from '@axonivy/inscription-protocol';
import type { SelectItem } from '../../../widgets';
import { ScriptInput, Select } from '../../../widgets';
import type { DataUpdater } from '../../../../types/lambda';
import { PathFieldset } from '..';
import RoleSelect from './RoleSelect';

export type ResponsibleUpdater = DataUpdater<WfTask['responsible']>;

type ResponsibleProps = { responsible?: WfActivator; updateResponsible: ResponsibleUpdater };
type ActivatorProps = ResponsibleProps & { selectedType?: WfActivatorType };

const ResponsibleActivator = ({ selectedType, ...props }: ActivatorProps) => {
  switch (selectedType) {
    case 'ROLE':
      return (
        <RoleSelect
          value={props.responsible?.activator}
          onChange={change => props.updateResponsible('activator', change)}
          showTaskRoles={true}
        />
      );
    case 'ROLE_FROM_ATTRIBUTE':
    case 'USER_FROM_ATTRIBUTE':
      return (
        <ScriptInput
          aria-label='activator'
          value={props.responsible?.activator ?? ''}
          onChange={change => props.updateResponsible('activator', change)}
          type={IVY_SCRIPT_TYPES.STRING}
          browsers={['attr', 'func', 'type']}
        />
      );
    case 'DELETE_TASK':
    default:
      return <></>;
  }
};

const DEFAULT_RESPONSIBLE_TYPE: SelectItem & { value: WfActivatorType } = { label: 'Role', value: 'ROLE' };

const ResponsibleSelect = (props: {
  responsible?: WfActivator;
  updateResponsible: ResponsibleUpdater;
  optionFilter?: WfActivatorType[];
}) => {
  const typeItems = useMemo<SelectItem[]>(
    () =>
      Object.entries(RESPONSIBLE_TYPE)
        .filter(([value]) => !(props.optionFilter && props.optionFilter.includes(value as WfActivatorType)))
        .map(([value, label]) => ({ label, value })),
    [props.optionFilter]
  );
  const selectedType = useMemo<SelectItem>(
    () => typeItems.find(e => e.value === props.responsible?.type) ?? DEFAULT_RESPONSIBLE_TYPE,
    [props.responsible?.type, typeItems]
  );

  return (
    <PathFieldset label='Responsible' path='responsible'>
      <div className='responsible-select'>
        <Select items={typeItems} value={selectedType} onChange={item => props.updateResponsible('type', item.value as WfActivatorType)} />
        <ResponsibleActivator {...props} selectedType={selectedType?.value as WfActivatorType} />
      </div>
    </PathFieldset>
  );
};

export default ResponsibleSelect;
