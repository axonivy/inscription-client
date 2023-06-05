import { WfTask, TaskData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { useCallback } from 'react';
import { Consumer } from '../../../../types/lambda';
import { useConfigDataContext, useTaskDataContext } from '../../../../context';

export function useTaskOptionsData(): {
  task: WfTask;
  initTask: WfTask;
  updateSkipTasklist: Consumer<boolean>;
  updateDelay: Consumer<string>;
} {
  const { task, initTask, setTask } = useTaskDataContext();

  const updateSkipTasklist = useCallback<Consumer<boolean>>(
    skip =>
      setTask(
        produce(draft => {
          draft.skipTasklist = skip;
        })
      ),
    [setTask]
  );

  const updateDelay = useCallback<Consumer<string>>(
    delay =>
      setTask(
        produce(draft => {
          draft.delay = delay;
        })
      ),
    [setTask]
  );

  return { task, initTask, updateSkipTasklist, updateDelay };
}

type TaskPersistData = Pick<TaskData, 'persist'>;

export function useTaskPersistData(): {
  persistData: TaskPersistData;
  defaultData: TaskPersistData;
  initData: TaskPersistData;
  updatePersist: Consumer<boolean>;
} {
  const { config, defaultConfig, initConfig, setConfig } = useConfigDataContext();

  const updatePersist = useCallback<Consumer<boolean>>(
    persist =>
      setConfig(
        produce(draft => {
          draft.persist = persist;
        })
      ),
    [setConfig]
  );

  return { persistData: config, defaultData: defaultConfig, initData: initConfig, updatePersist };
}
