import { Checkbox, CollapsiblePart, LabelInput } from '../../../widgets';
import { useData, useReadonly } from '../../../../context';

const TaskListPart = () => {
  const [, skipTaskList, setSkipTaskList] = useData('config/task/skipTasklist');
  const [, delay, setDelay] = useData('config/task/delay');
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
