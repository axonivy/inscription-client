import { RequestData, TaskData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { Consumer } from '../../../../types/lambda';
import { ConfigDataContext, useConfigDataContext } from '../../../../context';

export type TaskPersistData = Pick<TaskData, 'persistOnStart'> & Pick<RequestData, 'permission'>;

export function useTaskPersistData(): ConfigDataContext<TaskPersistData> & {
  updatePersist: Consumer<boolean>;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const updatePersist = (persistOnStart: boolean) =>
    setConfig(
      produce(draft => {
        draft.persistOnStart = persistOnStart;
      })
    );

  return { ...config, updatePersist };
}
