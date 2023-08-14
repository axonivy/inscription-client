import ExpiryPart from '../expiry/ExpiryPart';
import TaskListPart from '../options/TaskListOptions';
import PrioritySelect from '../priority/PrioritySelect';
import ResponsibleSelect from '../../common/responsible/ResponsibleSelect';
import { useTaskData } from '../useTaskData';
import { CustomFieldPart } from '../../common';
import Information from '../../common/info/Information';
import TaskCode from '../code/TaskCode';

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
