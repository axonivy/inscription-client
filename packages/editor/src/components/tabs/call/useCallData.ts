import { useDataContext } from '../../../context';
import { CallData, Mapping } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { useCallback } from 'react';
import { Consumer } from '../../../types/lambda';

export function useCallData(): {
  data: CallData;
  updateDialog: Consumer<string>;
  updateMap: Consumer<Mapping[]>;
  updateCode: Consumer<string>;
} {
  const { data, setData } = useDataContext();

  const updateDialog = useCallback<Consumer<string>>(
    dialog =>
      setData(
        produce<CallData>(draft => {
          draft.config.dialog = dialog;
        })
      ),
    [setData]
  );

  const updateMap = useCallback<Consumer<Mapping[]>>(
    map =>
      setData(
        produce<CallData>(draft => {
          if (!draft.config.call) {
            draft.config.call = {};
          }
          draft.config.call.map = map;
        })
      ),
    [setData]
  );

  const updateCode = useCallback<Consumer<string>>(
    code =>
      setData(
        produce<CallData>(draft => {
          if (!draft.config.call) {
            draft.config.call = {};
          }
          draft.config.call.code = code;
        })
      ),
    [setData]
  );

  return { data, updateDialog, updateMap, updateCode };
}
