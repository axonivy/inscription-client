import { ConfigDataContext, useConfigDataContext } from '../../../context';
import { CallData, DialogCallData, ProcessCallData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { Consumer, Updater } from '../../../types/lambda';

export function useCallData(): ConfigDataContext<CallData> & {
  updater: Updater<CallData['call']>;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const updater: Updater<CallData['call']> = (field, value) => {
    setConfig(
      produce(draft => {
        draft.call[field] = value;
      })
    );
  };

  return { ...config, updater };
}

export function useDialogCallData(): ConfigDataContext<DialogCallData> & {
  updateDialog: Consumer<string>;
  resetData: () => void;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const updateDialog = (dialog: string) =>
    setConfig(
      produce(draft => {
        draft.dialog = dialog;
      })
    );

  const resetData = () =>
    setConfig(
      produce(draft => {
        draft.dialog = config.initConfig.dialog;
        draft.call = config.initConfig.call;
      })
    );

  return { ...config, updateDialog, resetData };
}

export function useProcessCallData(): ConfigDataContext<ProcessCallData> & {
  updateProcessCall: Consumer<string>;
  resetData: () => void;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const updateProcessCall = (processCall: string) =>
    setConfig(
      produce(draft => {
        draft.processCall = processCall;
      })
    );

  const resetData = () =>
    setConfig(
      produce(draft => {
        draft.processCall = config.initConfig.processCall;
        draft.call = config.initConfig.call;
      })
    );

  return { ...config, updateProcessCall, resetData };
}
