import { useConfigDataContext } from '../../../context';
import { CallData, DialogCallData, Mapping, ProcessCallData } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { useCallback } from 'react';
import { Consumer } from '../../../types/lambda';

export function useCallData(): {
  callData: CallData;
  defaultData: CallData;
  updateMap: Consumer<Mapping>;
  updateCode: Consumer<string>;
} {
  const { config, defaultData, setConfig } = useConfigDataContext();

  const updateMap = useCallback<Consumer<Mapping>>(
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

  return { callData: config, defaultData, updateMap, updateCode };
}

export function useDialogCallData(): {
  dialogCallData: DialogCallData;
  defaultDialogData: DialogCallData;
  updateDialog: Consumer<string>;
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

  return { dialogCallData: config, defaultDialogData: defaultData, updateDialog };
}

export function useProcessCallData(): {
  processCallData: ProcessCallData;
  defaultProcessData: ProcessCallData;
  updateProcessCall: Consumer<string>;
} {
  const { config, defaultData, setConfig } = useConfigDataContext();

  const updateProcessCall = useCallback<Consumer<string>>(
    processCall =>
      setConfig(
        produce(draft => {
          draft.processCall = processCall;
        })
      ),
    [setConfig]
  );

  return { processCallData: config, defaultProcessData: defaultData, updateProcessCall };
}
