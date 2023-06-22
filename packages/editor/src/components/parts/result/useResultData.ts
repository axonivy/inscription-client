import { ConfigDataContext, useConfigDataContext } from '../../../context';
import { ResultData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { DataUpdater } from '../../../types/lambda';

export function useResultData(): ConfigDataContext<ResultData> & {
  update: DataUpdater<ResultData['result']>;
  resetData: () => void;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const update: DataUpdater<ResultData['result']> = (field, value) => {
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
    update,
    resetData
  };
}
