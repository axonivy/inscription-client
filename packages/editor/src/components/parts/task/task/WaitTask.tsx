import { useTaskData } from '../useTaskData';
import { CustomFieldPart } from '../../common';
import Information from '../../common/info/Information';
import TaskCode from '../code/TaskCode';

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
