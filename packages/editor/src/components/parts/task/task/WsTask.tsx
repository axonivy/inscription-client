import PrioritySelect from '../priority/PrioritySelect';
import { useTaskData } from '../useTaskData';
import { CustomFieldPart } from '../../common';
import Information from '../../common/info/Information';
import TaskCode from '../code/TaskCode';

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
