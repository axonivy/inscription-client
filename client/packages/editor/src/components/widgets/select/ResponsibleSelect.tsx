import './ResponsibleSelect.css';
import { useMemo } from 'react';
import { useData } from '../../../context';
import Select, { SelectItem } from './Select';

const responsibleItems: SelectItem[] = [
  { label: 'Role', value: 'ROLE' },
  { label: 'Role from Attr', value: 'ROLE_FROM_ATTR' },
  { label: 'User from Attr', value: 'USER_FROM_ATTR' },
  { label: 'Nobody & delete', value: 'NOBODY_DELETE' }
];

const roleItems: SelectItem[] = [
  { label: 'Everybody', value: 'Everybody' },
  { label: 'Employee', value: 'Employee' },
  { label: 'Teamleader', value: 'Teamleader' }
];

const ResponsibleSelect = () => {
  const [, responsible, setResponsible] = useData('config/task/expiry/responsible/role');
  const selectedResponsible = useMemo(() => responsibleItems.find(e => e.value === responsible), [responsible]);
  const selectedRole = useMemo(() => roleItems.find(e => e.value === 'Everybody'), []);

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
