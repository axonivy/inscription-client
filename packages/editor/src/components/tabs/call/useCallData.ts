import { useConfigDataContext } from '../../../context';
import { CallData, Mapping } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { useCallback } from 'react';
import { Consumer } from '../../../types/lambda';

export function useCallData(): {
  callData: CallData;
  defaultData: CallData;
  updateDialog: Consumer<string>;
  updateMap: Consumer<Mapping[]>;
  updateCode: Consumer<string>;
} {
  const { config, defaultData, setConfig } = useConfigDataContext();

  const updateDialog = useCallback<Consumer<string>>(
    dialog =>
      setConfig(
        produce(draft => {
          draft.dialog = dialog;
        })
      ),
    [setConfig]
  );

  const updateMap = useCallback<Consumer<Mapping[]>>(
    map =>
      setConfig(
        produce(draft => {
          draft.call.map = map;
        })
      ),
    [setConfig]
  );

  const updateCode = useCallback<Consumer<string>>(
    code =>
      setConfig(
        produce(draft => {
          draft.call.code = code;
        })
      ),
    [setConfig]
  );

  return { callData: config, defaultData, updateDialog, updateMap, updateCode };
}
