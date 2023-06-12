import { useConfigDataContext } from '../../../context';
import { SignalCatchData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { useCallback } from 'react';
import { Consumer } from '../../../types/lambda';

export function useSignalCatchData(): {
  data: SignalCatchData;
  defaultData: SignalCatchData;
  initData: SignalCatchData;
  updateSignalCode: Consumer<string>;
  updateAttachToBusinessCase: Consumer<boolean>;
  resetData: () => void;
} {
  const { config, defaultConfig, initConfig, setConfig } = useConfigDataContext();

  const updateSignalCode = useCallback<Consumer<string>>(
    signalCode =>
      setConfig(
        produce(draft => {
          draft.signalCode = signalCode;
        })
      ),
    [setConfig]
  );

  const updateAttachToBusinessCase = useCallback<Consumer<boolean>>(
    attachToBusinessCase =>
      setConfig(
        produce(draft => {
          draft.attachToBusinessCase = attachToBusinessCase;
        })
      ),
    [setConfig]
  );

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

  return { data: config, defaultData: defaultConfig, initData: initConfig, updateSignalCode, updateAttachToBusinessCase, resetData };
}
