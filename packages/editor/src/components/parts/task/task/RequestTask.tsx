import ExpiryPart from '../expiry/ExpiryPart';
import PersistOptions from '../options/PersistOptions';
import PrioritySelect from '../priority/PrioritySelect';
import { useTaskData } from '../useTaskData';
import Information from '../../common/info/Information';
import TaskCode from '../code/TaskCode';
import CustomFieldTable from '../../common/customfield/CustomFieldTable';

const RequestTask = () => {
  const { task, update, updatePriority } = useTaskData();
  return (
    <>
      <Information config={task} update={update} />
      <PrioritySelect priority={task.priority} updatePriority={updatePriority} />
      <PersistOptions />
      <ExpiryPart />
      <CustomFieldTable data={task.customFields} onChange={change => update('customFields', change)} type='TASK' />
      <TaskCode />
    </>
  );
};

export default RequestTask;
