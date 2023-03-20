import { WfTask, TaskData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { useCallback } from 'react';
import { Consumer } from '../../../../types/lambda';
import { useConfigDataContext, useTaskDataContext } from '../../../../context';

export function useTaskOptionsData(): {
  task: WfTask;
  updateSkipTasklist: Consumer<boolean>;
  updateDelay: Consumer<string>;
} {
  const { task, setTask } = useTaskDataContext();

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

  return { task, updateSkipTasklist: updateSkipTasklist, updateDelay };
}

export function useTaskPersistData(): {
  persistData: Pick<TaskData, 'persist'>;
  defaultData: Pick<TaskData, 'persist'>;
  updatePersist: Consumer<boolean>;
} {
  const { config, defaultData, setConfig } = useConfigDataContext();

  const updatePersist = useCallback<Consumer<boolean>>(
    persist =>
      setConfig(
        produce(draft => {
          draft.persist = persist;
        })
      ),
    [setConfig]
  );

  return { persistData: config, defaultData, updatePersist };
}
