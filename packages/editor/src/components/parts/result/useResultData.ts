import { ConfigDataContext, useConfigDataContext } from '../../../context';
import { ResultData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { Updater } from '../../../types/lambda';

export function useResultData(): ConfigDataContext<ResultData> & {
  updater: Updater<ResultData['result']>;
  resetData: () => void;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const updater: Updater<ResultData['result']> = (field, value) => {
    setConfig(
      produce(draft => {
        draft.result[field] = value;
      })
    );
  };

  const resetData = () =>
    setConfig(
      produce(draft => {
        draft.result = config.initConfig.result;
      })
    );

  return {
    ...config,
    updater,
    resetData
  };
}
