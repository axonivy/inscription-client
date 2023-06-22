import { ConfigDataContext, useConfigDataContext } from '../../../context';
import { SignalCatchData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { Updater } from '../../../types/lambda';

export function useSignalCatchData(): ConfigDataContext<SignalCatchData> & {
  updater: Updater<SignalCatchData>;
  resetData: () => void;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const updater: Updater<SignalCatchData> = (field, value) => {
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

  return { ...config, updater, resetData };
}
