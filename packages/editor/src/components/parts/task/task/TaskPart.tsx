import ExpiryPart from '../expiry/ExpiryPart';
import PersistPart from '../options/PersistPart';
import TaskListPart from '../options/TaskListPart';
import PrioritySelect from '../priority/PrioritySelect';
import CustomFieldPart from '../../common/customfield/CustomFieldPart';
import { CodeEditor, CollapsiblePart, Fieldset, Input, Textarea } from '../../../widgets';
import ResponsibleSelect from '../responsible/ResponsibleSelect';
import { useTaskData } from '../useTaskData';

const TaskPart = (props: { showPersist?: boolean }) => {
  const { task, updater, updateResponsible, updatePriority } = useTaskData();

  return (
    <>
      <Fieldset label='Name' htmlFor='taskName'>
        <Input id='taskName' value={task.name} onChange={change => updater('name', change)} />{' '}
      </Fieldset>
      <Fieldset label='Description' htmlFor='taskDescription'>
        <Textarea maxRows={10} id='taskDescription' value={task.description} onChange={change => updater('description', change)} />
      </Fieldset>
      <Fieldset label='Category' htmlFor='taskCategory'>
        <Input id='taskCategory' value={task.category} onChange={change => updater('category', change)} />
      </Fieldset>
      {!props.showPersist && (
        <ResponsibleSelect responsible={task.responsible} updateResponsible={updateResponsible} optionFilter={['DELETE_TASK']} />
      )}
      <PrioritySelect priority={task.priority} updatePriority={updatePriority} />
      {props.showPersist ? <PersistPart /> : <TaskListPart />}
      <ExpiryPart />
      <CustomFieldPart customFields={task.customFields} updateCustomFields={change => updater('customFields', change)} />
      <CollapsiblePart collapsibleLabel='Code' defaultOpen={task.code.length > 0}>
        <CodeEditor code={task.code} onChange={change => updater('code', change)} location='task.code' />
      </CollapsiblePart>
    </>
  );
};

export default TaskPart;
