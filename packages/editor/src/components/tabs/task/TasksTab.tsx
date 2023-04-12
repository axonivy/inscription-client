import { WfTask as TaskData } from '@axonivy/inscription-protocol';
import { EmptyWidget, Tab } from '../../../components/widgets';
import { TaskDataContextInstance, useConfigDataContext } from '../../../context';
import { TabProps, useTabState } from '../../props';
import TaskPart from './general/TaskPart';

export function useTasksTab(): TabProps {
  const { config, defaultData } = useConfigDataContext();
  const tabState = useTabState(defaultData.tasks, config.tasks, []);
  return { name: 'Tasks', state: tabState, content: <TasksTab /> };
}

const TasksTab = () => {
  const { config } = useConfigDataContext();

  const tabs: TabProps[] =
    config.tasks?.map((task: TaskData, index: any) => {
      return {
        name: task.id ?? '',
        content: (
          <TaskDataContextInstance.Provider value={index}>
            <TaskPart />
          </TaskDataContextInstance.Provider>
        )
      } as TabProps;
    }) ?? [];

  return <>{tabs.length > 0 ? <Tab tabs={tabs} /> : <EmptyWidget message='There is no (Task) output flow connected.' />}</>;
};
