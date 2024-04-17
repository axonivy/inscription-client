import type { RestResponseData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import type { DataUpdater } from '../../../types/lambda';
import type { ConfigDataContext } from '../../../context';
import { useConfigDataContext } from '../../../context';

export function useRestErrorData(): ConfigDataContext<RestResponseData> & {
  update: DataUpdater<RestResponseData['response']>;
  resetData: () => void;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const update: DataUpdater<RestResponseData['response']> = (field, value) => {
    setConfig(
      produce(draft => {
        draft.response[field] = value;
      })
    );
  };

  const resetData = () =>
    setConfig(
      produce(draft => {
        draft.response.clientError = config.initConfig.response.clientError;
        draft.response.statusError = config.initConfig.response.statusError;
      })
    );

  return {
    ...config,
    update,
    resetData
  };
}
