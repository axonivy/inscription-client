import { ConfigData, Data, InscriptionValidation, Task } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { createContext, useCallback, useContext } from 'react';
import { UpdateConsumer } from '../types/lambda';

export interface DataContext {
  data: Data;
  setData: UpdateConsumer<Data>;
  validation: InscriptionValidation[];
}

const defaultDataContext: any = undefined;

export const DataContextInstance = createContext<DataContext>(defaultDataContext);
export const useDataContext = (): DataContext => useContext(DataContextInstance);

export function useConfigDataContext(): {
  config: ConfigData;
  setConfig: UpdateConsumer<ConfigData>;
} {
  const { data, setData } = useDataContext();

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

  return { config: getConfig(), setConfig };
}

export const TaskDataContextInstance = createContext<number | undefined>(undefined);

export function useTaskDataContext(): {
  task: Task;
  setTask: UpdateConsumer<Task>;
} {
  const taskNumber = useContext(TaskDataContextInstance);
  const { config, setConfig } = useConfigDataContext();

  const getTask = useCallback(() => {
    if (taskNumber !== undefined) {
      return config.tasks[taskNumber];
    } else {
      return config.task;
    }
  }, [config, taskNumber]);

  const setTask = useCallback<UpdateConsumer<Task>>(
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

  return { task: getTask(), setTask };
}
