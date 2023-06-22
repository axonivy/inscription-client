import { ConfigDataContext, useConfigDataContext } from '../../../context';
import { ErrorCatchData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { Consumer } from '../../../types/lambda';

export function useErrorCatchData(): ConfigDataContext<ErrorCatchData> & {
  updateErrorCode: Consumer<string>;
  resetData: () => void;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const updateErrorCode = (errorCode: string) =>
    setConfig(
      produce(draft => {
        draft.errorCode = errorCode;
      })
    );

  const resetData = () =>
    setConfig(
      produce(draft => {
        draft.errorCode = config.initConfig.errorCode;
      })
    );

  return { ...config, updateErrorCode, resetData };
}
