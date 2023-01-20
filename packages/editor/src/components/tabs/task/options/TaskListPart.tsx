import { Checkbox, CollapsiblePart, LabelInput } from '../../../widgets';
import { useReadonly } from '../../../../context';
import { useTaskOptionsData } from './useTaskOptionsData';

const TaskListPart = () => {
  const { task, updateSkipTasklist, updateDelay } = useTaskOptionsData();
  const readonly = useReadonly();

  return (
    <CollapsiblePart collapsibleLabel='Options' defaultOpen={task.skipTasklist}>
      <Checkbox label='Skip Tasklist' value={task.skipTasklist ?? false} onChange={updateSkipTasklist} />
      <LabelInput label='Delay' htmlFor='delay'>
        <input
          className='input'
          id='delay'
          value={task.delay ?? ''}
          onChange={event => updateDelay(event.target.value)}
          disabled={readonly}
        />
      </LabelInput>
    </CollapsiblePart>
  );
};

export default TaskListPart;
