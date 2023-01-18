import { useReadonly } from '../../../context';
import ExpiryPart from './ExpiryPart';
import PersistPart from './options/PersistPart';
import PrioritySelect from './priority/PrioritySelect';
import CustomFieldPart from '../common/customfield/CustomFieldPart';
import { CodeEditor, CollapsiblePart, LabelInput } from '../../widgets';
import TaskListPart from './options/TaskListPart';
import ResponsibleSelect from './responsible/ResponsibleSelect';
import { useTaskData } from './useTaskData';

const Task = (props: { showPersist?: boolean }) => {
  const { task, updateName, updateDescription, updateCategory, updateCustomFields, updateCode } = useTaskData();
  const readonly = useReadonly();

  return (
    <>
      <LabelInput label='Name' htmlFor='name'>
        <input className='input' id='name' value={task.name ?? ''} onChange={event => updateName(event.target.value)} disabled={readonly} />
      </LabelInput>
      <LabelInput label='Description' htmlFor='description'>
        <textarea
          rows={2}
          className='input'
          id='description'
          value={task.description ?? ''}
          onChange={event => updateDescription(event.target.value)}
          disabled={readonly}
        />
      </LabelInput>
      <LabelInput label='Category' htmlFor='category'>
        <input
          className='input'
          id='category'
          value={task.category ?? ''}
          onChange={event => updateCategory(event.target.value)}
          disabled={readonly}
        />
      </LabelInput>
      {!props.showPersist && <ResponsibleSelect />}
      <PrioritySelect />
      {props.showPersist ? <PersistPart /> : <TaskListPart />}
      <ExpiryPart />
      <CustomFieldPart customFields={task.customFields} updateCustomFields={updateCustomFields} />
      <CollapsiblePart collapsibleLabel='Code' defaultOpen={false}>
        <CodeEditor code={task.code ?? ''} onChange={code => updateCode(code ?? '')} location='task.code' />
      </CollapsiblePart>
    </>
  );
};

export default Task;
