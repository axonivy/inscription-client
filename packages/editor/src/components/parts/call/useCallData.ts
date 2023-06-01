import { useConfigDataContext } from '../../../context';
import { CallData, DialogCallData, Mapping, ProcessCallData } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { useCallback } from 'react';
import { Consumer } from '../../../types/lambda';

export function useCallData(): {
  callData: CallData;
  defaultData: CallData;
  initData: CallData;
  updateMap: Consumer<Mapping>;
  updateCode: Consumer<string>;
} {
  const { config, defaultConfig, initConfig, setConfig } = useConfigDataContext();

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

  return { callData: config, initData: initConfig, defaultData: defaultConfig, updateMap, updateCode };
}

export function useDialogCallData(): {
  dialogCallData: DialogCallData;
  defaultDialogData: DialogCallData;
  initDialogData: DialogCallData;
  updateDialog: Consumer<string>;
  resetData: () => void;
} {
  const { config, defaultConfig, initConfig, setConfig } = useConfigDataContext();

  const updateDialog = useCallback<Consumer<string>>(
    dialog =>
      setConfig(
        produce(draft => {
          draft.dialog = dialog;
        })
      ),
    [setConfig]
  );

  const resetData = useCallback<() => void>(
    () =>
      setConfig(
        produce(draft => {
          draft.dialog = initConfig.dialog;
          draft.call = initConfig.call;
        })
      ),
    [initConfig.call, initConfig.dialog, setConfig]
  );

  return { dialogCallData: config, initDialogData: initConfig, defaultDialogData: defaultConfig, updateDialog, resetData };
}

export function useProcessCallData(): {
  processCallData: ProcessCallData;
  defaultProcessData: ProcessCallData;
  initProcessData: ProcessCallData;
  updateProcessCall: Consumer<string>;
  resetData: () => void;
} {
  const { config, defaultConfig, initConfig, setConfig } = useConfigDataContext();

  const updateProcessCall = useCallback<Consumer<string>>(
    processCall =>
      setConfig(
        produce(draft => {
          draft.processCall = processCall;
        })
      ),
    [setConfig]
  );

  const resetData = useCallback<() => void>(
    () =>
      setConfig(
        produce(draft => {
          draft.processCall = initConfig.processCall;
          draft.call = initConfig.call;
        })
      ),
    [initConfig.call, initConfig.processCall, setConfig]
  );

  return { processCallData: config, initProcessData: initConfig, defaultProcessData: defaultConfig, updateProcessCall, resetData };
}
