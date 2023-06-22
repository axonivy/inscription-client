import { useConfigDataContext } from '../../../context';
import { SignalCatchData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { useCallback } from 'react';
import { Updater } from '../../../types/lambda';

export function useSignalCatchData(): {
  data: SignalCatchData;
  defaultData: SignalCatchData;
  initData: SignalCatchData;
  updater: Updater<SignalCatchData>;
  resetData: () => void;
} {
  const { config, defaultConfig, initConfig, setConfig } = useConfigDataContext();

  const updater: Updater<SignalCatchData> = (field, value) => {
    setConfig(
      produce((draft: SignalCatchData) => {
        draft[field] = value;
      })
    );
  };

  const resetData = useCallback(
    () =>
      setConfig(
        produce(draft => {
          draft.signalCode = initConfig.signalCode;
          draft.attachToBusinessCase = initConfig.attachToBusinessCase;
        })
      ),
    [setConfig, initConfig]
  );

  return { data: config, defaultData: defaultConfig, initData: initConfig, updater, resetData };
}
