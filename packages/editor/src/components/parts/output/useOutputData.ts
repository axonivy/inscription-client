import { useConfigDataContext } from '../../../context';
import { Mapping, OutputData } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { useCallback } from 'react';
import { Consumer } from '../../../types/lambda';

export function useOutputData(): {
  outputData: OutputData;
  defaultData: OutputData;
  initData: OutputData;
  updateMap: Consumer<Mapping>;
  updateCode: Consumer<string>;
  updateSudo: Consumer<boolean>;
  resetCode: () => void;
  resetOutput: Consumer<boolean | undefined>;
} {
  const { config, defaultConfig, initConfig, setConfig } = useConfigDataContext();

  const updateMap = useCallback<Consumer<Mapping>>(
    map =>
      setConfig(
        produce(draft => {
          draft.output.map = map;
        })
      ),
    [setConfig]
  );

  const updateCode = useCallback<Consumer<string>>(
    code =>
      setConfig(
        produce(draft => {
          draft.output.code = code;
        })
      ),
    [setConfig]
  );

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
    updateMap,
    updateCode,
    updateSudo,
    resetCode,
    resetOutput
  };
}
