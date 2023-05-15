import { useConfigDataContext } from '../../../context';
import { Mapping, OutputData } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { useCallback } from 'react';
import { Consumer } from '../../../types/lambda';

export function useOutputData(): {
  outputData: OutputData;
  defaultData: OutputData;
  updateMap: Consumer<Mapping>;
  updateCode: Consumer<string>;
  updateSudo: Consumer<boolean>;
} {
  const { config, defaultData, setConfig } = useConfigDataContext();

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

  return { outputData: config, defaultData, updateMap, updateCode, updateSudo };
}
