import { IVY_SCRIPT_TYPES } from '@axonivy/inscription-protocol';
import { Checkbox, ScriptInput, useFieldset } from '../../../widgets';
import { PathCollapsible, ValidationFieldset } from '../../common';
import { useTaskData } from '../useTaskData';

const TaskListPart = () => {
  const { task, update } = useTaskData();
  const delayFieldset = useFieldset();

  return (
    <PathCollapsible label='Options' defaultOpen={task.skipTasklist} path='delay'>
      <Checkbox label='Skip Tasklist' value={task.skipTasklist} onChange={change => update('skipTasklist', change)} />
      <Checkbox label='Suppress Notification' value={task.notification.suppress} onChange={change => update('notification', {suppress: change})} />
      <ValidationFieldset label='Delay' {...delayFieldset.labelProps}>
        <ScriptInput
          value={task.delay}
          onChange={change => update('delay', change)}
          {...delayFieldset.inputProps}
          browsers={['attr', 'func', 'datatype']}
          type={IVY_SCRIPT_TYPES.DURATION}
        />
      </ValidationFieldset>
    </PathCollapsible>
  );
};

export default TaskListPart;
