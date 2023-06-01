import { useConfigDataContext } from '../../../context';
import { Mapping, ScriptVariable, StartData } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { useCallback } from 'react';
import { Consumer } from '../../../types/lambda';

export function useStartData(): {
  data: StartData;
  defaultData: StartData;
  initData: StartData;
  updateSignature: Consumer<string>;
  updateParams: Consumer<ScriptVariable[]>;
  updateMap: Consumer<Mapping>;
  updateCode: Consumer<string>;
  resetData: () => void;
} {
  const { config, defaultConfig, initConfig, setConfig } = useConfigDataContext();

  const updateSignature = useCallback<Consumer<string>>(
    signature =>
      setConfig(
        produce(draft => {
          draft.signature = signature;
        })
      ),
    [setConfig]
  );

  const updateParams = useCallback<Consumer<ScriptVariable[]>>(
    params =>
      setConfig(
        produce(draft => {
          draft.input.params = params;
        })
      ),
    [setConfig]
  );

  const updateMap = useCallback<Consumer<Mapping>>(
    map =>
      setConfig(
        produce(draft => {
          draft.input.map = map;
        })
      ),
    [setConfig]
  );

  const updateCode = useCallback<Consumer<string>>(
    code =>
      setConfig(
        produce(draft => {
          draft.input.code = code;
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
    updateSignature,
    updateParams,
    updateMap,
    updateCode,
    resetData
  };
}
