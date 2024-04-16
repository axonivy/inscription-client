import type { ConfigDataContext } from '../../../context';
import { useConfigDataContext, useDataContext } from '../../../context';
import type { ErrorThrowData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import type { DataUpdater } from '../../../types/lambda';

export function useErrorThrowData(): ConfigDataContext<ErrorThrowData> & {
  update: DataUpdater<ErrorThrowData>;
  updateThrows: DataUpdater<ErrorThrowData['throws']>;
  reset: () => void;
} {
  const { setData } = useDataContext();
  const { setConfig, ...config } = useConfigDataContext();

  const update: DataUpdater<ErrorThrowData> = (field, value) => {
    setConfig(
      produce((draft: ErrorThrowData) => {
        draft[field] = value;
      })
    );
  };

  const updateThrows: DataUpdater<ErrorThrowData['throws']> = (field, value) => {
    setData(
      produce(draft => {
        if (field === 'error' && draft.name === draft.config.throws.error) {
          draft.name = value;
        }
        draft.config.throws[field] = value;
      })
    );
  };

  const reset = () =>
    setConfig(
      produce(draft => {
        draft.throws = config.initConfig.throws;
        draft.code = config.initConfig.code;
      })
    );

  return { ...config, update, updateThrows, reset };
}
