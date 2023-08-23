import { ConfigDataContext, useConfigDataContext, useDataContext } from '../../../context';
import { SignalCatchData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { Consumer, DataUpdater } from '../../../types/lambda';

export function useSignalCatchData(): ConfigDataContext<SignalCatchData> & {
  update: DataUpdater<SignalCatchData>;
  updateSignal: Consumer<string>;
  resetData: () => void;
} {
  const { setData } = useDataContext();
  const { setConfig, ...config } = useConfigDataContext();

  const updateSignal = (signalCode: string) => {
    setData(
      produce(draft => {
        if (draft.name === draft.config.signalCode) {
          draft.name = signalCode;
        }
        draft.config.signalCode = signalCode;
      })
    );
  };

  const update: DataUpdater<SignalCatchData> = (field, value) => {
    setConfig(
      produce((draft: SignalCatchData) => {
        draft[field] = value;
      })
    );
  };

  const resetData = () =>
    setConfig(
      produce(draft => {
        draft.signalCode = config.initConfig.signalCode;
        draft.attachToBusinessCase = config.initConfig.attachToBusinessCase;
      })
    );

  return { ...config, update, updateSignal, resetData };
}
