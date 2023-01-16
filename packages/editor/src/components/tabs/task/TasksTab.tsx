import { InscriptionValidation } from '@axonivy/inscription-protocol';
import { TaskDataContextInstance } from '../../../context/useTaskData';
import { Tab } from '../../../components/widgets';
import { useData, useValidation } from '../../../context';
import { TabProps, useTabState } from '../../props';
import Task from './Task';

function useTasksTabValidation(): InscriptionValidation[] {
  const tasks = useValidation('config/tasks');
  return [tasks];
}

export function useTasksTab(options?: { showPersist?: boolean }): TabProps {
  const [initData, data] = useData('config/tasks');
  const validation = useTasksTabValidation();
  const tabState = useTabState(initData, data, validation);
  return {
    name: 'Tasks',
    state: tabState,
    content: <TasksTab />
  };
}

const TasksTab = () => {
  const [tasks] = useData('config/tasks') as any[];

  const tabs: TabProps[] = tasks.map((task: any, index: any) => {
    return {
      name: task.name,
      content: (
        <TaskDataContextInstance.Provider value={`config/tasks/${index}`}>
          <Task />
        </TaskDataContextInstance.Provider>
      )
    } as TabProps;
  });

  return <Tab tabs={tabs} />;
};
