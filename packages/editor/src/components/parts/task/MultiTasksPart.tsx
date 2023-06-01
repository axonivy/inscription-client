import { WfTask as TaskData } from '@axonivy/inscription-protocol';
import { EmptyWidget, Tab } from '../../widgets';
import { TaskDataContextInstance } from '../../../context';
import { PartProps, usePartDirty, usePartState } from '../../props';
import TaskPart from './general/TaskPart';
import { useMutliTaskData } from './useTaskData';

export function useMultiTasksPart(): PartProps {
  const { tasks, defaultTasks, initTasks, resetTasks } = useMutliTaskData();
  const state = usePartState(defaultTasks, tasks, []);
  const dirty = usePartDirty(initTasks, tasks);
  return { name: 'Tasks', state, reset: { dirty, action: () => resetTasks() }, content: <MultiTasksPart /> };
}

const MultiTasksPart = () => {
  const { tasks } = useMutliTaskData();

  const tabs: PartProps[] =
    tasks?.map((task: TaskData, index: any) => {
      return {
        name: task.id ?? '',
        content: (
          <TaskDataContextInstance.Provider value={index}>
            <TaskPart />
          </TaskDataContextInstance.Provider>
        )
      } as PartProps;
    }) ?? [];

  return <>{tabs.length > 0 ? <Tab tabs={tabs} /> : <EmptyWidget message='There is no (Task) output flow connected.' />}</>;
};
