import './ResponsibleSelect.css';
import { useEffect, useMemo, useState } from 'react';
import { Responsible, ResponsibleType } from '@axonivy/inscription-protocol';
import { Select, SelectItem } from '../../../../components/widgets';
import { useClient, useEditorContext } from '../../../../context';

const DEFAULT_ROLE: SelectItem = { label: 'Everybody', value: 'Everybody' };

export interface ResponsibleUpdater {
  updateType: (type: ResponsibleType) => void;
  updateActivator: (activator: string) => void;
}

const ResponsibleSelect = (props: { responsible?: Responsible; updateResponsible: ResponsibleUpdater; optionFilter?: string[] }) => {
  const typeItems = useMemo<SelectItem[]>(
    () =>
      Object.entries(ResponsibleType)
        .filter(entry => !(props.optionFilter && props.optionFilter.includes(entry[1])))
        .map(entry => {
          return { label: entry[1], value: entry[0] };
        }),
    [props.optionFilter]
  );
  const selectedType = useMemo(() => typeItems.find(e => e.value === props.responsible?.type), [props.responsible?.type, typeItems]);

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

  const selectedRole =
    useMemo(() => roleItems.find(e => e.value === props.responsible?.activator), [props.responsible?.activator, roleItems]) ?? DEFAULT_ROLE;

  return (
    <div className='responsible-select'>
      <Select
        label='Responsible'
        items={typeItems}
        value={selectedType}
        onChange={item => props.updateResponsible.updateType(item.value as ResponsibleType)}
      >
        <>
          {selectedType?.label === ResponsibleType.ROLE && (
            <Select
              label='Role'
              items={roleItems}
              value={selectedRole}
              onChange={item => props.updateResponsible.updateActivator(item.value)}
            />
          )}
          {selectedType?.label === ResponsibleType.ROLE_FROM_ATTRIBUTE && (
            <input
              className='input'
              value={props.responsible?.activator ?? ''}
              onChange={e => props.updateResponsible.updateActivator(e.target.value)}
            />
          )}
          {selectedType?.label === ResponsibleType.USER_FROM_ATTRIBUTE && (
            <input
              className='input'
              value={props.responsible?.activator ?? ''}
              onChange={e => props.updateResponsible.updateActivator(e.target.value)}
            />
          )}
        </>
      </Select>
    </div>
  );
};

export default ResponsibleSelect;
