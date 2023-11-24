import type { ConfigDataContext } from '../../../context/index.js';
import { useConfigDataContext } from '../../../context/index.js';
import type { ScriptData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import type { DataUpdater } from '../../../types/lambda.js';

export function useScriptData(): ConfigDataContext<ScriptData> & {
  update: DataUpdater<ScriptData>;
  reset: () => void;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const update: DataUpdater<ScriptData> = (field, value) => {
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
