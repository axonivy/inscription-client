import './ResponsibleSelect.css';
import { useEffect, useMemo, useState } from 'react';
import { useClient, useData } from '../../../context';
import Select, { SelectItem } from './Select';

const responsibleItems: SelectItem[] = [
  { label: 'Role', value: 'ROLE' },
  { label: 'Role from Attr', value: 'ROLE_FROM_ATTR' },
  { label: 'User from Attr', value: 'USER_FROM_ATTR' },
  { label: 'Nobody & delete', value: 'NOBODY_DELETE' }
];

const ResponsibleSelect = () => {
  const [, responsible, setResponsible] = useData('config/task/expiry/responsible/role');
  const selectedResponsible = useMemo(() => responsibleItems.find(e => e.value === responsible), [responsible]);
  const [roleItems, setRoleItems] = useState<SelectItem[]>([]);

  const client = useClient();
  useEffect(() => {
    client.roles().then(roles =>
      setRoleItems(
        roles.map(role => {
          return { label: role.id, value: role.id };
        })
      )
    );
  }, [client]);

  const selectedRole = useMemo(() => roleItems.find(e => e.value === 'Everybody'), [roleItems]) ?? {
    label: 'Everybody',
    value: 'Everybody'
  };

  return (
    <div className='responsible-select'>
      <Select label='Responsible' items={responsibleItems} value={selectedResponsible} onChange={item => setResponsible(item.value)}>
        <>
          {selectedResponsible?.value === 'ROLE' && <Select label='Role' items={roleItems} value={selectedRole} onChange={() => {}} />}
          {selectedResponsible?.value === 'ROLE_FROM_ATTR' && <input className='input' />}
          {selectedResponsible?.value === 'USER_FROM_ATTR' && <input className='input' />}
        </>
      </Select>
    </div>
  );
};

export default ResponsibleSelect;
