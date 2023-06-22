import { Checkbox, CollapsiblePart, Fieldset, Input } from '../../../widgets';
import { useTaskOptionsData } from './useTaskOptionsData';

const TaskListPart = () => {
  const { task, updater } = useTaskOptionsData();

  return (
    <CollapsiblePart collapsibleLabel='Options' defaultOpen={task.skipTasklist}>
      <Checkbox label='Skip Tasklist' value={task.skipTasklist} onChange={change => updater('skipTasklist', change)} />
      <Fieldset label='Delay' htmlFor='taskDelay'>
        <Input id='taskDelay' value={task.delay} onChange={change => updater('delay', change)} />
      </Fieldset>
    </CollapsiblePart>
  );
};

export default TaskListPart;
