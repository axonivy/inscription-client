import { WsResponseData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { DataUpdater } from '../../../types/lambda';
import { ConfigDataContext, useConfigDataContext } from '../../../context';

export function useWsResponseData(): ConfigDataContext<WsResponseData> & {
  update: DataUpdater<WsResponseData>;
  updateOutput: DataUpdater<WsResponseData['output']>;
  resetData: () => void;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const update: DataUpdater<WsResponseData> = (field, value) => {
    setConfig(
      produce((draft: WsResponseData) => {
        draft[field] = value;
      })
    );
  };

  const updateOutput: DataUpdater<WsResponseData['output']> = (field, value) => {
    setConfig(
      produce(draft => {
        draft.output[field] = value;
      })
    );
  };

  const resetData = () =>
    setConfig(
      produce(draft => {
        draft.output = config.initConfig.output;
        draft.exceptionHandler = config.initConfig.exceptionHandler;
      })
    );

  return {
    ...config,
    update,
    updateOutput,
    resetData
  };
}
