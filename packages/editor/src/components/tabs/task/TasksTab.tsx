import { DEFAULT_TASK, Task as TaskData } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { EmptyWidget, Tab } from '../../../components/widgets';
import { TaskDataContextInstance, useConfigDataContext } from '../../../context';
import { TabProps, useTabState } from '../../props';
import TaskPart from './general/TaskPart';

export function useTasksTab(): TabProps {
  const { config } = useConfigDataContext();
  const defaultTasks = config.tasks.map(task =>
    produce(DEFAULT_TASK, draft => {
      draft.id = task.id;
    })
  );
  const tabState = useTabState(defaultTasks, config.tasks, []);
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
