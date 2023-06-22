import { ConfigDataContext, useConfigDataContext } from '../../../context';
import { SignalCatchData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { DataUpdater } from '../../../types/lambda';

export function useSignalCatchData(): ConfigDataContext<SignalCatchData> & {
  update: DataUpdater<SignalCatchData>;
  resetData: () => void;
} {
  const { setConfig, ...config } = useConfigDataContext();

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

  return { ...config, update, resetData };
}
