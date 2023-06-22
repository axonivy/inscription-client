import { Checkbox, CollapsiblePart, Fieldset, Input } from '../../../widgets';
import { useTaskData } from '../useTaskData';

const TaskListPart = () => {
  const { task, update } = useTaskData();

  return (
    <CollapsiblePart collapsibleLabel='Options' defaultOpen={task.skipTasklist}>
      <Checkbox label='Skip Tasklist' value={task.skipTasklist} onChange={change => update('skipTasklist', change)} />
      <Fieldset label='Delay' htmlFor='taskDelay'>
        <Input id='taskDelay' value={task.delay} onChange={change => update('delay', change)} />
      </Fieldset>
    </CollapsiblePart>
  );
};

export default TaskListPart;
