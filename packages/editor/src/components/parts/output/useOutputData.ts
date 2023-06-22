import { useConfigDataContext } from '../../../context';
import { OutputData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { useCallback } from 'react';
import { Consumer, Updater } from '../../../types/lambda';

export function useOutputData(): {
  outputData: OutputData;
  defaultData: OutputData;
  initData: OutputData;
  updater: Updater<OutputData['output']>;
  updateSudo: Consumer<boolean>;
  resetCode: () => void;
  resetOutput: Consumer<boolean | undefined>;
} {
  const { config, defaultConfig, initConfig, setConfig } = useConfigDataContext();

  const updater: Updater<OutputData['output']> = (field, value) => {
    setConfig(
      produce(draft => {
        draft.output[field] = value;
      })
    );
  };

  const updateSudo = useCallback<Consumer<boolean>>(
    sudo =>
      setConfig(
        produce(draft => {
          draft.sudo = sudo;
        })
      ),
    [setConfig]
  );

  const resetCode = useCallback<() => void>(
    () =>
      setConfig(
        produce(draft => {
          draft.output.code = initConfig.output.code;
          draft.sudo = initConfig.sudo;
        })
      ),
    [initConfig.output.code, initConfig.sudo, setConfig]
  );

  const resetOutput = useCallback<Consumer<boolean | undefined>>(
    resetCode =>
      setConfig(
        produce(draft => {
          draft.output.map = initConfig.output.map;
          if (resetCode) {
            draft.output.code = initConfig.output.code;
          }
        })
      ),
    [initConfig.output.code, initConfig.output.map, setConfig]
  );

  return {
    outputData: config,
    defaultData: defaultConfig,
    initData: initConfig,
    updater,
    updateSudo,
    resetCode,
    resetOutput
  };
}
