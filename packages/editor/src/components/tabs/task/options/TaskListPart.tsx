import { Checkbox, CollapsiblePart, LabelInput } from '../../../widgets';
import { useReadonly, useTaskData } from '../../../../context';

const TaskListPart = () => {
  const [, skipTaskList, setSkipTaskList] = useTaskData('skipTasklist');
  const [, delay, setDelay] = useTaskData('delay');
  const readonly = useReadonly();

  return (
    <CollapsiblePart collapsibleLabel='Options' defaultOpen={skipTaskList}>
      <Checkbox label='Skip Tasklist' value={skipTaskList} onChange={setSkipTaskList} />
      <LabelInput label='Delay' htmlFor='delay'>
        <input className='input' id='delay' value={delay} onChange={event => setDelay(event.target.value)} disabled={readonly} />
      </LabelInput>
    </CollapsiblePart>
  );
};

export default TaskListPart;
