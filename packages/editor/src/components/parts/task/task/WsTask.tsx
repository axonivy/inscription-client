import PrioritySelect from '../priority/PrioritySelect.js';
import { useTaskData } from '../useTaskData.js';
import { CustomFieldPart } from '../../common/index.js';
import Information from '../../common/info/Information.js';
import TaskCode from '../code/TaskCode.js';

const WsTask = () => {
  const { task, update, updatePriority } = useTaskData();
  return (
    <>
      <Information config={task} update={update} />
      <PrioritySelect priority={task.priority} updatePriority={updatePriority} />
      <CustomFieldPart customFields={task.customFields} updateCustomFields={change => update('customFields', change)} type='TASK' />
      <TaskCode />
    </>
  );
};

export default WsTask;
