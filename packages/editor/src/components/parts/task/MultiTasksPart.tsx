import { TaskData } from '@axonivy/inscription-protocol';
import { EmptyWidget, Tab, Tabs } from '../../widgets';
import { TaskDataContextInstance, useValidations } from '../../../context';
import { PartProps, usePartDirty, usePartState } from '../../editors';
import TaskPart from './task/TaskPart';
import { useMutliTaskData } from './useTaskData';

export function useMultiTasksPart(): PartProps {
  const { config, defaultConfig, initConfig, resetTasks } = useMutliTaskData();
  const validations = useValidations(['tasks']);
  const compareData = (data: TaskData) => [data.tasks];
  const state = usePartState(compareData(defaultConfig), compareData(config), validations);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Tasks', state, reset: { dirty, action: () => resetTasks() }, content: <MultiTasksPart /> };
}

const MultiTasksPart = () => {
  const { config } = useMutliTaskData();

  const tabs: Tab[] =
    config.tasks?.map<Tab>((task, index) => {
      const taskId = task.id ?? '';
      return {
        id: taskId,
        name: taskId,
        content: (
          <TaskDataContextInstance.Provider value={index}>
            <TaskPart />
          </TaskDataContextInstance.Provider>
        )
      };
    }) ?? [];

  return <>{tabs.length > 0 ? <Tabs tabs={tabs} /> : <EmptyWidget message='There is no (Task) output flow connected.' />}</>;
};
