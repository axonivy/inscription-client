import { WfTask, TaskData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { useCallback } from 'react';
import { Consumer, Updater } from '../../../../types/lambda';
import { useConfigDataContext, useTaskDataContext } from '../../../../context';

export function useTaskOptionsData(): {
  task: WfTask;
  initTask: WfTask;
  updater: Updater<WfTask>;
} {
  const { task, initTask, setTask } = useTaskDataContext();

  const updater: Updater<WfTask> = (field, value) => {
    setTask(
      produce(draft => {
        draft[field] = value;
      })
    );
  };

  return { task, initTask, updater };
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
