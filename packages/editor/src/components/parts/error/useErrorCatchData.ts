import { ConfigDataContext, useConfigDataContext } from '../../../context';
import { ErrorCatchData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { DataUpdater } from '../../../types/lambda';

export function useErrorCatchData(): ConfigDataContext<ErrorCatchData> & {
  update: DataUpdater<ErrorCatchData>;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const update: DataUpdater<ErrorCatchData> = (field, value) => {
    setConfig(
      produce(draft => {
        draft[field] = value;
      })
    );
  };

  return { ...config, update };
}
