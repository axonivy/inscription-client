import './ResponsibleSelect.css';
import { useEffect, useMemo, useState } from 'react';
import { ResponsibleType } from '@axonivy/inscription-protocol';
import { Select, SelectItem } from '../../../../components/widgets';
import { useClient, useEditorContext, useTaskData } from '../../../../context';

const ResponsibleSelect = (props: {
  typePath: 'responsible/type' | 'expiry/responsible/type';
  activatorPath: 'responsible/activator' | 'expiry/responsible/activator';
  hideDeleteOption?: boolean;
}) => {
  const [, type, setType] = useTaskData(props.typePath);
  const [, activator, setActivator] = useTaskData(props.activatorPath);

  const typeItems = useMemo<SelectItem[]>(
    () =>
      Object.entries(ResponsibleType)
        .filter(entry => !(props.hideDeleteOption && entry[1] === ResponsibleType.DELETE_TASK))
        .map(entry => {
          return { label: entry[1], value: entry[0] };
        }),
    [props.hideDeleteOption]
  );
  const selectedType = useMemo(() => typeItems.find(e => e.value === type), [type, typeItems]);

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

  const selectedRole = useMemo(() => roleItems.find(e => e.value === activator), [activator, roleItems]) ?? {
    label: 'Everybody',
    value: 'Everybody'
  };

  return (
    <div className='responsible-select'>
      <Select label='Responsible' items={typeItems} value={selectedType} onChange={item => setType(item.value as ResponsibleType)}>
        <>
          {selectedType?.label === ResponsibleType.ROLE && (
            <Select label='Role' items={roleItems} value={selectedRole} onChange={item => setActivator(item.value)} />
          )}
          {selectedType?.label === ResponsibleType.ROLE_FROM_ATTRIBUTE && (
            <input className='input' value={activator} onChange={e => setActivator(e.target.value)} />
          )}
          {selectedType?.label === ResponsibleType.USER_FROM_ATTRIBUTE && (
            <input className='input' value={activator} onChange={e => setActivator(e.target.value)} />
          )}
        </>
      </Select>
    </div>
  );
};

export default ResponsibleSelect;
