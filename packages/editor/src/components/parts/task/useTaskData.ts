import { TaskData, WfTask } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { Updater } from '../../../types/lambda';
import { ConfigDataContext, TaskDataContext, useConfigDataContext, useTaskDataContext } from '../../../context';
import { ResponsibleUpdater } from './responsible/ResponsibleSelect';
import { PriorityUpdater } from './priority/PrioritySelect';

export function useTaskData(): TaskDataContext & {
  updater: Updater<WfTask>;
  updateResponsible: ResponsibleUpdater;
  updatePriority: PriorityUpdater;
} {
  const { setTask, ...task } = useTaskDataContext();

  const updater: Updater<WfTask> = (field, value) => {
    setTask(
      produce(draft => {
        draft[field] = value;
      })
    );
  };

  const updateResponsible: ResponsibleUpdater = (field, value) => {
    setTask(
      produce(draft => {
        draft.responsible[field] = value;
      })
    );
  };

  const updatePriority: PriorityUpdater = (field, value) => {
    setTask(
      produce(draft => {
        draft.priority[field] = value;
      })
    );
  };

  return {
    ...task,
    updater,
    updateResponsible,
    updatePriority
  };
}

export function useMutliTaskData(): ConfigDataContext<TaskData> & {
  resetTasks: () => void;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const resetTasks = () =>
    setConfig(
      produce(draft => {
        draft.tasks = config.initConfig.tasks;
      })
    );

  return {
    ...config,
    resetTasks
  };
}
