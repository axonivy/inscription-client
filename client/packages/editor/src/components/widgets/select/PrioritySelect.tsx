import './PrioritySelect.css';
import { useMemo } from 'react';
import { useData } from '../../../context';
import Select, { SelectItem } from './Select';
import { TaskDataAccess } from '@axonivy/inscription-core';

const elements: SelectItem[] = [
  { label: 'Low', value: 'LOW' },
  { label: 'Normal', value: 'NORMAL' },
  { label: 'High', value: 'HIGH' },
  { label: 'Exception', value: 'EXCEPTION' },
  { label: 'Script', value: 'SCRIPT' }
];

const PrioritySelect = (props: { dataPath: keyof TaskDataAccess }) => {
  const [, priority, setPriority] = useData(props.dataPath);
  const selectedItem = useMemo(() => elements.find(e => e.value === priority), [priority]);

  return (
    <div className='priority-select'>
      <Select label='Priority' value={selectedItem} onChange={item => setPriority(item.value)} items={elements}>
        <>{selectedItem?.value === 'SCRIPT' && <input className='input' />}</>
      </Select>
    </div>
  );
};

export default PrioritySelect;
