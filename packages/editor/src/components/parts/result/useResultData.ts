import { useConfigDataContext } from '../../../context';
import { ResultData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { useCallback } from 'react';
import { Updater } from '../../../types/lambda';

export function useResultData(): {
  data: ResultData;
  defaultData: ResultData;
  initData: ResultData;
  updater: Updater<ResultData['result']>;
  resetData: () => void;
} {
  const { config, defaultConfig, initConfig, setConfig } = useConfigDataContext();

  const updater: Updater<ResultData['result']> = (field, value) => {
    setConfig(
      produce(draft => {
        draft.result[field] = value;
      })
    );
  };

  const resetData = useCallback<() => void>(
    () =>
      setConfig(
        produce(draft => {
          draft.result = initConfig.result;
        })
      ),
    [initConfig.result, setConfig]
  );

  return {
    data: config,
    defaultData: defaultConfig,
    initData: initConfig,
    updater,
    resetData
  };
}
