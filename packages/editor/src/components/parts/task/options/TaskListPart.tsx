import { Checkbox, Collapsible, Fieldset, Input, useFieldset } from '../../../widgets';
import { useTaskData } from '../useTaskData';

const TaskListPart = () => {
  const { task, update } = useTaskData();
  const delayFieldset = useFieldset();

  return (
    <Collapsible label='Options' defaultOpen={task.skipTasklist}>
      <Checkbox label='Skip Tasklist' value={task.skipTasklist} onChange={change => update('skipTasklist', change)} />
      <Fieldset label='Delay' {...delayFieldset.labelProps}>
        <Input value={task.delay} onChange={change => update('delay', change)} {...delayFieldset.inputProps} />
      </Fieldset>
    </Collapsible>
  );
};

export default TaskListPart;
