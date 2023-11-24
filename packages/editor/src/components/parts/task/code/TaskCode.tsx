import { ScriptArea } from '../../../../components/widgets/index.js';
import { PathCollapsible, ValidationFieldset } from '../../common/index.js';
import { useTaskData } from '../useTaskData.js';

const TaskCode = () => {
  const { task, update } = useTaskData();
  return (
    <PathCollapsible label='Code' defaultOpen={task.code.length > 0} path='code'>
      <ValidationFieldset>
        <ScriptArea value={task.code} onChange={change => update('code', change)} browsers={['attr', 'func', 'type']} />
      </ValidationFieldset>
    </PathCollapsible>
  );
};

export default TaskCode;
