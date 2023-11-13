import type { ConfigDataContext} from '../../../context';
import { useConfigDataContext } from '../../../context';
import type { CodeData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import type { DataUpdater } from '../../../types/lambda';

export function useCodeData(): ConfigDataContext<CodeData> & {
  update: DataUpdater<CodeData>;
  reset: () => void;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const update: DataUpdater<CodeData> = (field, value) => {
    setConfig(
      produce(draft => {
        draft[field] = value;
      })
    );
  };

  const reset = () =>
    setConfig(
      produce(draft => {
        draft.code = config.initConfig.code;
      })
    );

  return {
    ...config,
    update,
    reset
  };
}
