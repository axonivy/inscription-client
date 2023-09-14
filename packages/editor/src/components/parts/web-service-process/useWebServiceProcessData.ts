import { ConfigDataContext, useConfigDataContext } from '../../../context';
import { WebServiceProcessData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { DataUpdater } from '../../../types/lambda';

export function useWebServiceProcessData(): ConfigDataContext<WebServiceProcessData> & {
  update: DataUpdater<WebServiceProcessData>;
  reset: () => void;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const update: DataUpdater<WebServiceProcessData> = (field, value) => {
    setConfig(
      produce((draft: WebServiceProcessData) => {
        draft[field] = value;
      })
    );
  };

  const reset = () =>
    setConfig(
      produce(draft => {
        draft.wsAuth = config.initConfig.wsAuth;
        draft.wsTypeName = config.initConfig.wsTypeName;
      })
    );

  return {
    ...config,
    update,
    reset
  };
}
