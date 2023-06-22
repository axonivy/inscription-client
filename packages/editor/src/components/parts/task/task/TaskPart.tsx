import ExpiryPart from '../expiry/ExpiryPart';
import PersistPart from '../options/PersistPart';
import TaskListPart from '../options/TaskListPart';
import PrioritySelect from '../priority/PrioritySelect';
import CustomFieldPart from '../../common/customfield/CustomFieldPart';
import { CodeEditor, CollapsiblePart, Fieldset, Input, Textarea } from '../../../widgets';
import ResponsibleSelect from '../responsible/ResponsibleSelect';
import { useTaskData } from '../useTaskData';

const TaskPart = (props: { showPersist?: boolean }) => {
  const { task, update, updateResponsible, updatePriority } = useTaskData();

  return (
    <>
      <Fieldset label='Name' htmlFor='taskName'>
        <Input id='taskName' value={task.name} onChange={change => update('name', change)} />{' '}
      </Fieldset>
      <Fieldset label='Description' htmlFor='taskDescription'>
        <Textarea maxRows={10} id='taskDescription' value={task.description} onChange={change => update('description', change)} />
      </Fieldset>
      <Fieldset label='Category' htmlFor='taskCategory'>
        <Input id='taskCategory' value={task.category} onChange={change => update('category', change)} />
      </Fieldset>
      {!props.showPersist && (
        <ResponsibleSelect responsible={task.responsible} updateResponsible={updateResponsible} optionFilter={['DELETE_TASK']} />
      )}
      <PrioritySelect priority={task.priority} updatePriority={updatePriority} />
      {props.showPersist ? <PersistPart /> : <TaskListPart />}
      <ExpiryPart />
      <CustomFieldPart customFields={task.customFields} updateCustomFields={change => update('customFields', change)} />
      <CollapsiblePart collapsibleLabel='Code' defaultOpen={task.code.length > 0}>
        <CodeEditor code={task.code} onChange={change => update('code', change)} location='task.code' />
      </CollapsiblePart>
    </>
  );
};

export default TaskPart;
