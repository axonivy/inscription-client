import { ConfigDataContext, useConfigDataContext } from '../../../context';
import { ErrorThrowData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { DataUpdater } from '../../../types/lambda';

export function useErrorThrowData(): ConfigDataContext<ErrorThrowData> & {
  update: DataUpdater<ErrorThrowData['throws']>;
  reset: () => void;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const update: DataUpdater<ErrorThrowData['throws']> = (field, value) => {
    setConfig(
      produce(draft => {
        draft.throws[field] = value;
      })
    );
  };

  const reset = () =>
    setConfig(
      produce(draft => {
        draft.throws = config.initConfig.throws;
      })
    );

  return { ...config, update, reset };
}
