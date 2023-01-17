import { useReadonly, useTaskData } from '../../../context';
import ExpiryPart from './ExpiryPart';
import PersistPart from './options/PersistPart';
import PrioritySelect from './priority/PrioritySelect';
import CustomFieldPart from '../common/customfield/CustomFieldPart';
import { CodeEditor, CollapsiblePart, LabelInput } from '../../widgets';
import TaskListPart from './options/TaskListPart';
import ResponsibleSelect from './responsible/ResponsibleSelect';

const Task = (props: { showPersist?: boolean }) => {
  const [, name, setName] = useTaskData('name');
  const [, description, setDescription] = useTaskData('description');
  const [, category, setCategory] = useTaskData('category');
  const [, code, setCode] = useTaskData('code');
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
      {!props.showPersist && (
        <ResponsibleSelect typePath='responsible/type' activatorPath='responsible/activator' hideDeleteOption={true} />
      )}
      <PrioritySelect dataPath='priority' />
      {props.showPersist ? <PersistPart /> : <TaskListPart />}
      <ExpiryPart />
      <CustomFieldPart />
      <CollapsiblePart collapsibleLabel='Code' defaultOpen={false}>
        <CodeEditor code={code} onChange={code => setCode(code ?? '')} location='task.code' />
      </CollapsiblePart>
    </>
  );
};

export default Task;
