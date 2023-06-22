import { TaskData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { useCallback } from 'react';
import { Consumer } from '../../../../types/lambda';
import { useConfigDataContext } from '../../../../context';

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
