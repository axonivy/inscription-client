import { RestResponseData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { DataUpdater } from '../../../types/lambda';
import { ConfigDataContext, useConfigDataContext } from '../../../context';

export function useRestResponseData(): ConfigDataContext<RestResponseData> & {
  update: DataUpdater<RestResponseData['response']>;
  updateEntity: DataUpdater<RestResponseData['response']['entity']>;
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

  const updateEntity: DataUpdater<RestResponseData['response']['entity']> = (field, value) => {
    setConfig(
      produce(draft => {
        draft.response.entity[field] = value;
      })
    );
  };

  const resetData = () =>
    setConfig(
      produce(draft => {
        draft.response = config.initConfig.response;
      })
    );

  return {
    ...config,
    update,
    updateEntity,
    resetData
  };
}
