import { ConfigDataContext, useConfigDataContext } from '../../../context';
import { WebserviceStartData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { DataUpdater } from '../../../types/lambda';

export function useWebServiceData(): ConfigDataContext<WebserviceStartData> & {
  updatePermission: DataUpdater<WebserviceStartData['permission']>;
  updateException: DataUpdater<WebserviceStartData['exception']>;
  reset: () => void;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const updatePermission: DataUpdater<WebserviceStartData['permission']> = (field, value) => {
    setConfig(
      produce(draft => {
        draft.permission[field] = value;
      })
    );
  };

  const updateException: DataUpdater<WebserviceStartData['exception']> = (field, value) => {
    setConfig(
      produce(draft => {
        draft.exception[field] = value;
      })
    );
  };

  const reset = () =>
    setConfig(
      produce(draft => {
        draft.permission = config.initConfig.permission;
        draft.exception = config.initConfig.exception;
      })
    );

  return {
    ...config,
    updatePermission,
    updateException,
    reset
  };
}
