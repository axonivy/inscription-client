import { useData, useReadonly } from '../../../context';
import { TabProps, TabState } from '../../props';
import ExpiryPart from './ExpiryPart';
import PersistPart from './options/PersistPart';
import PrioritySelect from './priority/PrioritySelect';
import CustomFieldPart from '../common/customfield/CustomFieldPart';
import { CodeEditor, CollapsiblePart, LabelInput } from '../../../components/widgets';

export function useTaskTab(): TabProps {
  return { name: 'Task', state: TabState.CONFIGURED, content: <TaskTab /> };
}

const TaskTab = () => {
  const [, name, setName] = useData('config/task/name');
  const [, description, setDescription] = useData('config/task/description');
  const [, category, setCategory] = useData('config/task/category');
  const [, code, setCode] = useData('config/task/code');
  const readonly = useReadonly();

  return (
    <>
      <LabelInput label='Name' htmlFor='name'>
        <input className='input' id='name' value={name} onChange={event => setName(event.target.value)} disabled={readonly} />
      </LabelInput>
      <LabelInput label='Description' htmlFor='description'>
        <textarea
          rows={2}
          className='input'
          id='description'
          value={description}
          onChange={event => setDescription(event.target.value)}
          disabled={readonly}
        />
      </LabelInput>
      <LabelInput label='Category' htmlFor='category'>
        <input className='input' id='category' value={category} onChange={event => setCategory(event.target.value)} disabled={readonly} />
      </LabelInput>
      <PrioritySelect dataPath='config/task/priority' />
      <PersistPart />
      <ExpiryPart />
      <CustomFieldPart />
      <CollapsiblePart collapsibleLabel='Code' defaultOpen={false}>
        <CodeEditor code={code} onChange={code => setCode(code ?? '')} location='task.code' />
      </CollapsiblePart>
    </>
  );
};
