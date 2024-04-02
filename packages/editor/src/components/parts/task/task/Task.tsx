import ExpiryPart from '../expiry/ExpiryPart';
import TaskOptionsPart from '../options/TaskOptionsPart';
import PrioritySelect from '../priority/PrioritySelect';
import ResponsibleSelect from '../../common/responsible/ResponsibleSelect';
import { useTaskData } from '../useTaskData';
import Information from '../../common/info/Information';
import TaskCode from '../code/TaskCode';
import NotificationPart from '../notification/NotificationPart';
import CustomFieldTable from '../../common/customfield/CustomFieldTable';

const Task = () => {
  const { task, defaultTask, update, updateResponsible, updatePriority } = useTaskData();
  return (
    <>
      <Information config={task} defaultConfig={defaultTask} update={update} />
      <ResponsibleSelect
        responsible={task.responsible}
        defaultResponsible={defaultTask.responsible}
        updateResponsible={updateResponsible}
        optionFilter={['DELETE_TASK']}
      />
      <PrioritySelect priority={task.priority} updatePriority={updatePriority} />
      <TaskOptionsPart />
      <ExpiryPart />
      <CustomFieldTable data={task.customFields} onChange={change => update('customFields', change)} type='TASK' />
      <NotificationPart />
      <TaskCode />
    </>
  );
};

export default Task;
