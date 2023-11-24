import { useTaskData } from '../useTaskData.js';
import { CustomFieldPart } from '../../common/index.js';
import Information from '../../common/info/Information.js';
import TaskCode from '../code/TaskCode.js';

const WaitTask = () => {
  const { task, update } = useTaskData();
  return (
    <>
      <Information config={task} update={update} />
      <CustomFieldPart customFields={task.customFields} updateCustomFields={change => update('customFields', change)} type='TASK' />
      <TaskCode />
    </>
  );
};

export default WaitTask;
