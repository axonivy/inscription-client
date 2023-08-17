import { ConfigDataContext, useConfigDataContext, useDataContext } from '../../../context';
import { ErrorCatchData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { Consumer } from '../../../types/lambda';

export function useErrorCatchData(): ConfigDataContext<ErrorCatchData> & {
  updateError: Consumer<string>;
} {
  const { setData } = useDataContext();
  const { setConfig, ...config } = useConfigDataContext();

  const updateError = (errorCode: string) => {
    setData(
      produce(draft => {
        if (draft.name === draft.config.errorCode) {
          draft.name = errorCode;
        }
        draft.config.errorCode = errorCode;
      })
    );
  };

  return { ...config, updateError };
}
