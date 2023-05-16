import { Checkbox, CollapsiblePart, Fieldset, Input } from '../../../widgets';
import { useTaskOptionsData } from './useTaskOptionsData';

const TaskListPart = () => {
  const { task, updateSkipTasklist, updateDelay } = useTaskOptionsData();

  return (
    <CollapsiblePart collapsibleLabel='Options' defaultOpen={task.skipTasklist}>
      <Checkbox label='Skip Tasklist' value={task.skipTasklist} onChange={updateSkipTasklist} />
      <Fieldset label='Delay' htmlFor='taskDelay'>
        <Input id='taskDelay' value={task.delay} onChange={change => updateDelay(change)} />
      </Fieldset>
    </CollapsiblePart>
  );
};

export default TaskListPart;
