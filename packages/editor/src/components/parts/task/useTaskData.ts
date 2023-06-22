import { TaskData, WfTask } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { DataUpdater } from '../../../types/lambda';
import { ConfigDataContext, TaskDataContext, useConfigDataContext, useTaskDataContext } from '../../../context';
import { ResponsibleUpdater } from './responsible/ResponsibleSelect';
import { PriorityUpdater } from './priority/PrioritySelect';

export function useTaskData(): TaskDataContext & {
  update: DataUpdater<WfTask>;
  updateResponsible: ResponsibleUpdater;
  updatePriority: PriorityUpdater;
} {
  const { setTask, ...task } = useTaskDataContext();

  const update: DataUpdater<WfTask> = (field, value) => {
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
    update,
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
