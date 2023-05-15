import ExpiryPart from '../expiry/ExpiryPart';
import PersistPart from '../options/PersistPart';
import TaskListPart from '../options/TaskListPart';
import PrioritySelect from '../priority/PrioritySelect';
import CustomFieldPart from '../../common/customfield/CustomFieldPart';
import { CodeEditor, CollapsiblePart, Fieldset, Input, Textarea } from '../../../widgets';
import ResponsibleSelect from '../responsible/ResponsibleSelect';
import { useTaskData } from '../useTaskData';

const TaskPart = (props: { showPersist?: boolean }) => {
  const { task, updateName, updateDescription, updateCategory, updateCustomFields, updateCode, updateResponsible, updatePriority } =
    useTaskData();

  return (
    <>
      <Fieldset label='Name' htmlFor='taskName'>
        <Input id='taskName' value={task.name} onChange={change => updateName(change)} />{' '}
      </Fieldset>
      <Fieldset label='Description' htmlFor='taskDescription'>
        <Textarea rows={2} id='taskDescription' value={task.description} onChange={change => updateDescription(change)} />
      </Fieldset>
      <Fieldset label='Category' htmlFor='taskCategory'>
        <Input id='taskCategory' value={task.category} onChange={change => updateCategory(change)} />
      </Fieldset>
      {!props.showPersist && (
        <ResponsibleSelect responsible={task.responsible} updateResponsible={updateResponsible} optionFilter={['DELETE_TASK']} />
      )}
      <PrioritySelect priority={task.priority} updatePriority={updatePriority} />
      {props.showPersist ? <PersistPart /> : <TaskListPart />}
      <ExpiryPart />
      <CustomFieldPart customFields={task.customFields} updateCustomFields={updateCustomFields} />
      <CollapsiblePart collapsibleLabel='Code' defaultOpen={task.code.length > 0}>
        <CodeEditor code={task.code} onChange={updateCode} location='task.code' />
      </CollapsiblePart>
    </>
  );
};

export default TaskPart;
