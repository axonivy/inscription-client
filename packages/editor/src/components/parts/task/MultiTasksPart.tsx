import { TaskData } from '@axonivy/inscription-protocol';
import { EmptyWidget, Tab } from '../../widgets';
import { TaskDataContextInstance } from '../../../context';
import { PartProps, usePartDirty, usePartState } from '../../props';
import TaskPart from './task/TaskPart';
import { useMutliTaskData } from './useTaskData';

export function useMultiTasksPart(): PartProps {
  const { config, defaultConfig, initConfig, resetTasks } = useMutliTaskData();
  const compareData = (data: TaskData) => [data.tasks];
  const state = usePartState(compareData(defaultConfig), compareData(config), []);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Tasks', state, reset: { dirty, action: () => resetTasks() }, content: <MultiTasksPart /> };
}

const MultiTasksPart = () => {
  const { config } = useMutliTaskData();

  const tabs: PartProps[] =
    config.tasks?.map((task, index) => {
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
