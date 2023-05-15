import { ConfigData, ElementData, InscriptionValidation, WfTask } from '@axonivy/inscription-protocol';
import produce from 'immer';
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

export function useConfigDataContext(): {
  config: ConfigData;
  defaultData: ConfigData;
  setConfig: UpdateConsumer<ConfigData>;
} {
  const { data, defaultData, setData } = useDataContext();

  const getConfig = useCallback(() => {
    return data.config;
  }, [data.config]);

  const setConfig = useCallback<UpdateConsumer<ConfigData>>(
    update =>
      setData(
        produce(draft => {
          draft.config = update(getConfig());
        })
      ),
    [getConfig, setData]
  );

  return { config: getConfig(), defaultData, setConfig };
}

export const TaskDataContextInstance = createContext<number | undefined>(undefined);

export function useTaskDataContext(): {
  task: WfTask;
  defaultTask: WfTask;
  setTask: UpdateConsumer<WfTask>;
} {
  const taskNumber = useContext(TaskDataContextInstance);
  const { config, defaultData, setConfig } = useConfigDataContext();

  const getTask = useCallback(() => {
    return taskNumber !== undefined ? config.tasks[taskNumber] : config.task;
  }, [config, taskNumber]);

  const setTask = useCallback<UpdateConsumer<WfTask>>(
    update =>
      setConfig(
        produce(draft => {
          if (taskNumber !== undefined) {
            draft.tasks[taskNumber] = update(getTask());
          } else {
            draft.task = update(getTask());
          }
        })
      ),
    [getTask, setConfig, taskNumber]
  );

  const defaultTask = taskNumber !== undefined ? defaultData.tasks[taskNumber] : defaultData.task;

  return { task: getTask(), defaultTask, setTask };
}
