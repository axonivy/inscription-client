import { ScriptArea } from '../../../../components/widgets';
import { PathCollapsible, ValidationFieldset } from '../../common';
import { useTaskData } from '../useTaskData';

const TaskCode = () => {
  const { task, update } = useTaskData();
  return (
    <PathCollapsible label='Code' defaultOpen={task.code.length > 0} path='code'>
      <ValidationFieldset>
        <ScriptArea value={task.code} onChange={change => update('code', change)} browsers={['attr', 'func', 'datatype']} />
      </ValidationFieldset>
    </PathCollapsible>
  );
};

export default TaskCode;
