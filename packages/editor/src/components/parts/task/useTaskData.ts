import { WfTask } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { useCallback } from 'react';
import { Updater } from '../../../types/lambda';
import { useConfigDataContext, useTaskDataContext } from '../../../context';
import { ResponsibleUpdater } from './responsible/ResponsibleSelect';
import { PriorityUpdater } from './priority/PrioritySelect';

export function useTaskData(): {
  task: WfTask;
  defaultTask: WfTask;
  initTask: WfTask;
  updater: Updater<WfTask>;
  updateResponsible: ResponsibleUpdater;
  updatePriority: PriorityUpdater;
  resetTask: () => void;
} {
  const { task, defaultTask, initTask, setTask, resetTask } = useTaskDataContext();

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
    task,
    defaultTask,
    initTask,
    updater,
    updateResponsible,
    updatePriority,
    resetTask
  };
}

export function useMutliTaskData(): {
  tasks: WfTask[];
  defaultTasks: WfTask[];
  initTasks: WfTask[];
  resetTasks: () => void;
} {
  const { config, defaultConfig, initConfig, setConfig } = useConfigDataContext();

  const resetTasks = useCallback<() => void>(
    () =>
      setConfig(
        produce(draft => {
          draft.tasks = initConfig.tasks;
        })
      ),
    [initConfig.tasks, setConfig]
  );

  return {
    tasks: config.tasks,
    defaultTasks: defaultConfig.tasks,
    initTasks: initConfig.tasks,
    resetTasks
  };
}
