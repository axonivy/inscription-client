import { ConfigData, ElementData, InscriptionValidation, WfTask } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { createContext, useCallback, useContext } from 'react';
import { UpdateConsumer } from '../types/lambda';

export interface DataContext {
  data: ElementData;
  setData: UpdateConsumer<ElementData>;
  defaultData: ConfigData;
  initData: ElementData;
  validation: InscriptionValidation[];
}

const defaultDataContext: any = undefined;

export const DataContextInstance = createContext<DataContext>(defaultDataContext);
export const useDataContext = (): DataContext => useContext(DataContextInstance);

export type ConfigDataContext<T> = {
  config: T;
  defaultConfig: T;
  initConfig: T;
};

export function useConfigDataContext<T extends ConfigData>(): ConfigDataContext<T> & {
  setConfig: UpdateConsumer<ConfigData>;
} {
  const { data, initData, defaultData, setData } = useDataContext();

  const setConfig = useCallback<UpdateConsumer<ConfigData>>(
    update =>
      setData(
        produce(draft => {
          draft.config = update(draft.config);
        })
      ),
    [setData]
  );

  return { config: data.config as T, initConfig: initData.config as T, defaultConfig: defaultData as T, setConfig };
}

export const TaskDataContextInstance = createContext<number | undefined>(undefined);

export type TaskDataContext = {
  task: WfTask;
  defaultTask: WfTask;
  initTask: WfTask;
  resetTask: () => void;
};

export function useTaskDataContext(): TaskDataContext & {
  setTask: UpdateConsumer<WfTask>;
} {
  const taskNumber = useContext(TaskDataContextInstance);
  const { config, defaultConfig, initConfig, setConfig } = useConfigDataContext();

  const setTask = useCallback<UpdateConsumer<WfTask>>(
    update =>
      setConfig(
        produce(draft => {
          if (taskNumber !== undefined) {
            draft.tasks[taskNumber] = update(draft.tasks[taskNumber]);
          } else {
            draft.task = update(draft.task);
          }
        })
      ),
    [setConfig, taskNumber]
  );

  const resetTask = useCallback<() => void>(
    () =>
      setConfig(
        produce(draft => {
          if (taskNumber !== undefined) {
            draft.tasks[taskNumber] = initConfig.tasks[taskNumber];
          } else {
            draft.task = initConfig.task;
          }
        })
      ),
    [initConfig.task, initConfig.tasks, setConfig, taskNumber]
  );

  const task = taskNumber !== undefined ? config.tasks[taskNumber] : config.task;
  const defaultTask = taskNumber !== undefined ? defaultConfig.tasks[taskNumber] : defaultConfig.task;
  const initTask = taskNumber !== undefined ? initConfig.tasks[taskNumber] : initConfig.task;
  return { task, defaultTask, initTask, setTask, resetTask };
}
