import { useConfigDataContext } from '../../../context';
import { ErrorCatchData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { useCallback } from 'react';
import { Consumer } from '../../../types/lambda';

export function useErrorCatchData(): {
  data: ErrorCatchData;
  defaultData: ErrorCatchData;
  initData: ErrorCatchData;
  updateErrorCode: Consumer<string>;
  resetData: () => void;
} {
  const { config, defaultConfig, initConfig, setConfig } = useConfigDataContext();

  const updateErrorCode = useCallback<Consumer<string>>(
    errorCode =>
      setConfig(
        produce(draft => {
          draft.errorCode = errorCode;
        })
      ),
    [setConfig]
  );

  const resetData = useCallback(
    () =>
      setConfig(
        produce(draft => {
          draft.errorCode = initConfig.errorCode;
        })
      ),
    [setConfig, initConfig]
  );

  return { data: config, defaultData: defaultConfig, initData: initConfig, updateErrorCode, resetData };
}
