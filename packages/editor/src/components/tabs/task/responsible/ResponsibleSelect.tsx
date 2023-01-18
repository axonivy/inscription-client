import './ResponsibleSelect.css';
import { useEffect, useMemo, useState } from 'react';
import { ResponsibleType } from '@axonivy/inscription-protocol';
import { Select, SelectItem } from '../../../../components/widgets';
import { useClient, useEditorContext } from '../../../../context';
import { useResponsibleData } from './useResponsibleData';

const DEFAULT_ROLE: SelectItem = { label: 'Everybody', value: 'Everybody' };

const ResponsibleSelect = (props: { expiry?: boolean }) => {
  const { responsible, updateType, updateActivator } = useResponsibleData(props.expiry);

  const typeItems = useMemo<SelectItem[]>(
    () =>
      Object.entries(ResponsibleType)
        .filter(entry => !(!props.expiry && entry[1] === ResponsibleType.DELETE_TASK))
        .map(entry => {
          return { label: entry[1], value: entry[0] };
        }),
    [props.expiry]
  );
  const selectedType = useMemo(() => typeItems.find(e => e.value === responsible?.type), [responsible?.type, typeItems]);

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
    useMemo(() => roleItems.find(e => e.value === responsible?.activator), [responsible?.activator, roleItems]) ?? DEFAULT_ROLE;

  return (
    <div className='responsible-select'>
      <Select label='Responsible' items={typeItems} value={selectedType} onChange={item => updateType(item.value as ResponsibleType)}>
        <>
          {selectedType?.label === ResponsibleType.ROLE && (
            <Select label='Role' items={roleItems} value={selectedRole} onChange={item => updateActivator(item.value)} />
          )}
          {selectedType?.label === ResponsibleType.ROLE_FROM_ATTRIBUTE && (
            <input className='input' value={responsible?.activator ?? ''} onChange={e => updateActivator(e.target.value)} />
          )}
          {selectedType?.label === ResponsibleType.USER_FROM_ATTRIBUTE && (
            <input className='input' value={responsible?.activator ?? ''} onChange={e => updateActivator(e.target.value)} />
          )}
        </>
      </Select>
    </div>
  );
};

export default ResponsibleSelect;
