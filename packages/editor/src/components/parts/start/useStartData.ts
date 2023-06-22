import { ConfigDataContext, useConfigDataContext } from '../../../context';
import { StartData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { Consumer, DataUpdater } from '../../../types/lambda';

export function useStartData(): ConfigDataContext<StartData> & {
  update: DataUpdater<StartData['input']>;
  updateSignature: Consumer<string>;
  resetData: () => void;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const update: DataUpdater<StartData['input']> = (field, value) => {
    setConfig(
      produce(draft => {
        draft.input[field] = value;
      })
    );
  };

  const updateSignature = (signature: string) =>
    setConfig(
      produce(draft => {
        draft.signature = signature;
      })
    );

  const resetData = () =>
    setConfig(
      produce(draft => {
        draft.signature = config.initConfig.signature;
        draft.input = config.initConfig.input;
      })
    );

  return {
    ...config,
    update,
    updateSignature,
    resetData
  };
}
