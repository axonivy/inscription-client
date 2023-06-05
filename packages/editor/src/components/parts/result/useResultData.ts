import { useConfigDataContext } from '../../../context';
import { Mapping, ScriptVariable, ResultData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { useCallback } from 'react';
import { Consumer } from '../../../types/lambda';

export function useResultData(): {
  data: ResultData;
  defaultData: ResultData;
  initData: ResultData;
  updateParams: Consumer<ScriptVariable[]>;
  updateMap: Consumer<Mapping>;
  updateCode: Consumer<string>;
  resetData: () => void;
} {
  const { config, defaultConfig, initConfig, setConfig } = useConfigDataContext();

  const updateParams = useCallback<Consumer<ScriptVariable[]>>(
    params =>
      setConfig(
        produce(draft => {
          draft.result.params = params;
        })
      ),
    [setConfig]
  );

  const updateMap = useCallback<Consumer<Mapping>>(
    map =>
      setConfig(
        produce(draft => {
          draft.result.map = map;
        })
      ),
    [setConfig]
  );

  const updateCode = useCallback<Consumer<string>>(
    code =>
      setConfig(
        produce(draft => {
          draft.result.code = code;
        })
      ),
    [setConfig]
  );

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
    updateParams,
    updateMap,
    updateCode,
    resetData
  };
}
