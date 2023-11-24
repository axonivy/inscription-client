import type { ConfigDataContext} from '../../../context/index.js';
import { useConfigDataContext, useDataContext } from '../../../context/index.js';
import type { SignalCatchData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import type { Consumer, DataUpdater } from '../../../types/lambda.js';

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
