import { useConfigDataContext } from '../../../context';
import { StartData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { useCallback } from 'react';
import { Consumer, Updater } from '../../../types/lambda';

export function useStartData(): {
  data: StartData;
  defaultData: StartData;
  initData: StartData;
  updater: Updater<StartData['input']>;
  updateSignature: Consumer<string>;
  resetData: () => void;
} {
  const { config, defaultConfig, initConfig, setConfig } = useConfigDataContext();

  const updater: Updater<StartData['input']> = (field, value) => {
    setConfig(
      produce(draft => {
        draft.input[field] = value;
      })
    );
  };

  const updateSignature = useCallback<Consumer<string>>(
    signature =>
      setConfig(
        produce(draft => {
          draft.signature = signature;
        })
      ),
    [setConfig]
  );

  const resetData = useCallback<() => void>(
    () =>
      setConfig(
        produce(draft => {
          draft.signature = initConfig.signature;
          draft.input = initConfig.input;
        })
      ),
    [initConfig.input, initConfig.signature, setConfig]
  );

  return {
    data: config,
    defaultData: defaultConfig,
    initData: initConfig,
    updater,
    updateSignature,
    resetData
  };
}
