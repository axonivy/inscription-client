import ExpiryPart from '../expiry/ExpiryPart';
import PersistOptions from '../options/PersistOptions';
import PrioritySelect from '../priority/PrioritySelect';
import { useTaskData } from '../useTaskData';
import { CustomFieldPart } from '../../common';
import Information from '../../common/info/Information';
import TaskCode from '../code/TaskCode';

const RequestTask = () => {
  const { task, update, updatePriority } = useTaskData();
  return (
    <>
      <Information config={task} update={update} />
      <PrioritySelect priority={task.priority} updatePriority={updatePriority} />
      <PersistOptions />
      <ExpiryPart />
      <CustomFieldPart customFields={task.customFields} updateCustomFields={change => update('customFields', change)} type='TASK' />
      <TaskCode />
    </>
  );
};

export default RequestTask;
