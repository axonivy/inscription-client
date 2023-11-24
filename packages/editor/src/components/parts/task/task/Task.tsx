import ExpiryPart from '../expiry/ExpiryPart.js';
import TaskListPart from '../options/TaskListOptions.js';
import PrioritySelect from '../priority/PrioritySelect.js';
import ResponsibleSelect from '../../common/responsible/ResponsibleSelect.js';
import { useTaskData } from '../useTaskData.js';
import { CustomFieldPart } from '../../common/index.js';
import Information from '../../common/info/Information.js';
import TaskCode from '../code/TaskCode.js';

const Task = () => {
  const { task, update, updateResponsible, updatePriority } = useTaskData();
  return (
    <>
      <Information config={task} update={update} />
      <ResponsibleSelect responsible={task.responsible} updateResponsible={updateResponsible} optionFilter={['DELETE_TASK']} />
      <PrioritySelect priority={task.priority} updatePriority={updatePriority} />
      <TaskListPart />
      <ExpiryPart />
      <CustomFieldPart customFields={task.customFields} updateCustomFields={change => update('customFields', change)} type='TASK' />
      <TaskCode />
    </>
  );
};

export default Task;
