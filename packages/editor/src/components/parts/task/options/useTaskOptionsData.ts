import { TaskData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { Consumer } from '../../../../types/lambda';
import { ConfigDataContext, useConfigDataContext } from '../../../../context';

export type TaskPersistData = Pick<TaskData, 'persist'>;

export function useTaskPersistData(): ConfigDataContext<TaskPersistData> & {
  updatePersist: Consumer<boolean>;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const updatePersist = (persist: boolean) =>
    setConfig(
      produce(draft => {
        draft.persist = persist;
      })
    );

  return { ...config, updatePersist };
}
