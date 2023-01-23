import { InscriptionValidation, Task as TaskData } from '@axonivy/inscription-protocol';
import { TaskDataContextInstance } from '../../../context/useTaskDataContext';
import { Tab } from '../../../components/widgets';
import { useDataContext, useValidation } from '../../../context';
import { TabProps, useTabState } from '../../props';
import TaskPart from './TaskPart';

function useTasksTabValidation(): InscriptionValidation[] {
  const tasks = useValidation('config/tasks');
  return [tasks];
}

export function useTasksTab(): TabProps {
  const validation = useTasksTabValidation();
  const tabState = useTabState({}, {}, validation);
  return {
    name: 'Tasks',
    state: tabState,
    content: <TasksTab />
  };
}

const TasksTab = () => {
  const { data } = useDataContext();

  const tabs: TabProps[] =
    data.config.tasks?.map((task: TaskData, index: any) => {
      return {
        name: task.id,
        content: (
          <TaskDataContextInstance.Provider value={index}>
            <TaskPart />
          </TaskDataContextInstance.Provider>
        )
      } as TabProps;
    }) ?? [];

  return <Tab tabs={tabs} />;
};
