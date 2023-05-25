import './ResponsibleSelect.css';
import { useEffect, useMemo, useState } from 'react';
import { WfActivator, WfActivatorType, RESPONSIBLE_TYPE } from '@axonivy/inscription-protocol';
import { Fieldset, Input, Select, SelectItem, useFieldset } from '../../../../components/widgets';
import { useClient, useEditorContext } from '../../../../context';
import { Consumer } from '../../../../types/lambda';

const DEFAULT_ROLE: SelectItem = { label: 'Everybody', value: 'Everybody' } as const;

export interface ResponsibleUpdater {
  updateType: Consumer<WfActivatorType>;
  updateActivator: Consumer<string>;
}

type ResponsibleProps = { responsible?: WfActivator; updateResponsible: ResponsibleUpdater };
type ActivatorProps = ResponsibleProps & { selectedType?: WfActivatorType };

const RoleSelect = ({ responsible, updateResponsible }: ResponsibleProps) => {
  const [roleItems, setRoleItems] = useState<SelectItem[]>([]);
  const editorContext = useEditorContext();
  const client = useClient();
  useEffect(() => {
    client.roles(editorContext.pid).then(roles =>
      setRoleItems(
        roles.map(role => {
          return { label: role.id, value: role.id };
        })
      )
    );
  }, [client, editorContext.pid]);
  const selectedRole = useMemo<SelectItem>(
    () => roleItems.find(e => e.value === responsible?.activator) ?? DEFAULT_ROLE,
    [responsible?.activator, roleItems]
  );

  return <Select items={roleItems} value={selectedRole} onChange={item => updateResponsible.updateActivator(item.value)} />;
};

const ResponsibleActivator = ({ selectedType, ...props }: ActivatorProps) => {
  switch (selectedType) {
    case 'ROLE':
      return <RoleSelect {...props} />;
    case 'ROLE_FROM_ATTRIBUTE':
    case 'USER_FROM_ATTRIBUTE':
      return (
        <Input
          aria-label='activator'
          value={props.responsible?.activator}
          onChange={change => props.updateResponsible.updateActivator(change)}
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

  const selectFieldset = useFieldset();

  return (
    <Fieldset label='Responsible' {...selectFieldset.labelProps}>
      <div className='responsible-select'>
        <Select
          items={typeItems}
          value={selectedType}
          onChange={item => props.updateResponsible.updateType(item.value as WfActivatorType)}
          inputProps={selectFieldset.inputProps}
        />
        <ResponsibleActivator {...props} selectedType={selectedType?.value as WfActivatorType} />
      </div>
    </Fieldset>
  );
};

export default ResponsibleSelect;
