import ExpiryPart from '../expiry/ExpiryPart';
import PersistPart from '../options/PersistPart';
import TaskListPart from '../options/TaskListPart';
import PrioritySelect from '../priority/PrioritySelect';
import CustomFieldPart from '../../common/customfield/CustomFieldPart';
import { CodeEditor, CollapsiblePart, Fieldset } from '../../../widgets';
import ResponsibleSelect from '../responsible/ResponsibleSelect';
import { useTaskData } from '../useTaskData';

const TaskPart = (props: { showPersist?: boolean }) => {
  const { task, update, updateResponsible, updatePriority } = useTaskData();

  return (
    <>
      <Fieldset label='Name' htmlFor='taskName'>
        <CodeEditor
          id='taskName'
          code={task.name}
          onChange={change => update('name', change)}
          location='task.name'
          language={'macro'}
          singleLine={true}
        />
      </Fieldset>
      <Fieldset label='Description' htmlFor='taskDescription'>
        <CodeEditor
          id='taskDescription'
          code={task.description}
          onChange={change => update('description', change)}
          location='task.description'
          language={'macro'}
        />
      </Fieldset>
      <Fieldset label='Category' htmlFor='taskCategory'>
        <CodeEditor
          id='taskCategory'
          code={task.category}
          onChange={change => update('category', change)}
          location='task.category'
          language={'macro'}
          singleLine={true}
        />
      </Fieldset>
      {!props.showPersist && (
        <ResponsibleSelect responsible={task.responsible} updateResponsible={updateResponsible} optionFilter={['DELETE_TASK']} />
      )}
      <PrioritySelect priority={task.priority} updatePriority={updatePriority} />
      {props.showPersist ? <PersistPart /> : <TaskListPart />}
      <ExpiryPart />
      <CustomFieldPart customFields={task.customFields} updateCustomFields={change => update('customFields', change)} />
      <CollapsiblePart collapsibleLabel='Code' defaultOpen={task.code.length > 0}>
        <CodeEditor id='taskCode' code={task.code} onChange={change => update('code', change)} location='task.code' />
      </CollapsiblePart>
    </>
  );
};

export default TaskPart;
