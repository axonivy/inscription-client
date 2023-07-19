import { Checkbox, Collapsible, ScriptInput, useFieldset } from '../../../widgets';
import { PathFieldset } from '../../common/path/PathFieldset';
import { useTaskData } from '../useTaskData';

const TaskListPart = () => {
  const { task, update } = useTaskData();
  const delayFieldset = useFieldset();

  return (
    <Collapsible label='Options' defaultOpen={task.skipTasklist}>
      <Checkbox label='Skip Tasklist' value={task.skipTasklist} onChange={change => update('skipTasklist', change)} />
      <PathFieldset label='Delay' {...delayFieldset.labelProps} path='delay'>
        <ScriptInput value={task.delay} onChange={change => update('delay', change)} {...delayFieldset.inputProps} type='Duration' />
      </PathFieldset>
    </Collapsible>
  );
};

export default TaskListPart;
