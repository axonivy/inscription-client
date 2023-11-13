import type { TaskData, WfTask } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import type { DataUpdater } from '../../../types/lambda';
import type { ConfigDataContext, TaskDataContext} from '../../../context';
import { useConfigDataContext, useTaskDataContext } from '../../../context';
import type { ResponsibleUpdater } from '../common/responsible/ResponsibleSelect';
import type { PriorityUpdater } from './priority/PrioritySelect';

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
