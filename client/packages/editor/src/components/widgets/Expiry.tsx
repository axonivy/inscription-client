import { useMemo } from 'react';
import { useData, useReadonly } from '../../context';
import CollapsiblePart from './collapsible/CollapsiblePart';
import LabelInput from './label/LabelInput';
import PrioritySelect from './select/PrioritySelect';
import ResponsibleSelect from './select/ResponsibleSelect';
import Select, { SelectItem } from './select/Select';

const errorItems: SelectItem[] = [
  { label: 'error 1', value: 'f29' },
  { label: 'error 2', value: 'f33' }
];

const Expiry = () => {
  const [, timeout, setTimeout] = useData('config/task/expiry/timeout');
  const [, error, setError] = useData('config/task/expiry/error');

  const selectedError = useMemo(() => errorItems.find(e => e.value === error), [error]);

  const readonly = useReadonly();

  return (
    <CollapsiblePart collapsibleLabel='Expiry' defaultOpen={false}>
      <LabelInput label='Timeout' htmlFor='timeout'>
        <input className='input' id='name' value={timeout} onChange={event => setTimeout(event.target.value)} disabled={readonly} />
      </LabelInput>
      <Select label='Error' items={errorItems} value={selectedError} onChange={item => setError(item.value)} />
      <ResponsibleSelect />
      <PrioritySelect dataPath='config/task/expiry/priority' />
    </CollapsiblePart>
  );
};

export default Expiry;
