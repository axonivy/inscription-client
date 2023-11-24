import type { ConfigDataContext} from '../../../context/index.js';
import { useConfigDataContext, useDataContext } from '../../../context/index.js';
import type { ErrorThrowData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import type { DataUpdater } from '../../../types/lambda.js';

export function useErrorThrowData(): ConfigDataContext<ErrorThrowData> & {
  update: DataUpdater<ErrorThrowData['throws']>;
  reset: () => void;
} {
  const { setData } = useDataContext();
  const { setConfig, ...config } = useConfigDataContext();

  const update: DataUpdater<ErrorThrowData['throws']> = (field, value) => {
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
      })
    );

  return { ...config, update, reset };
}
