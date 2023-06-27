import { Checkbox, CollapsiblePart, Fieldset, Input, useFieldset } from '../../../widgets';
import { useTaskData } from '../useTaskData';

const TaskListPart = () => {
  const { task, update } = useTaskData();
  const delayFieldset = useFieldset();

  return (
    <CollapsiblePart collapsibleLabel='Options' defaultOpen={task.skipTasklist}>
      <Checkbox label='Skip Tasklist' value={task.skipTasklist} onChange={change => update('skipTasklist', change)} />
      <Fieldset label='Delay' {...delayFieldset.labelProps}>
        <Input value={task.delay} onChange={change => update('delay', change)} {...delayFieldset.inputProps} />
      </Fieldset>
    </CollapsiblePart>
  );
};

export default TaskListPart;
