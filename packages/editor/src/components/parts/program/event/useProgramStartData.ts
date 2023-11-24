import type { ConfigDataContext} from '../../../../context/index.js';
import { useConfigDataContext } from '../../../../context/index.js';
import type { ProgramStartData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import type { DataUpdater } from '../../../../types/lambda.js';

export function useProgramStartData(): ConfigDataContext<ProgramStartData> & {
  update: DataUpdater<ProgramStartData>;
  updatePermission: DataUpdater<ProgramStartData['permission']>;
  reset: () => void;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const update: DataUpdater<ProgramStartData> = (field, value) => {
    setConfig(
      produce((draft: ProgramStartData) => {
        draft[field] = value;
      })
    );
  };

  const updatePermission: DataUpdater<ProgramStartData['permission']> = (field, value) => {
    setConfig(
      produce(draft => {
        draft.permission[field] = value;
      })
    );
  };

  const reset = () =>
    setConfig(
      produce(draft => {
        draft.javaClass = config.initConfig.javaClass;
        draft.permission = config.initConfig.permission;
      })
    );

  return {
    ...config,
    update,
    updatePermission,
    reset
  };
}
