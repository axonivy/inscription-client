import type { ConfigDataContext} from '../../../../context';
import { useConfigDataContext } from '../../../../context';
import type { ProgramInterfaceStartData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import type { DataUpdater } from '../../../../types/lambda';

export function useProgramInterfaceStartData(): ConfigDataContext<ProgramInterfaceStartData> & {
  update: DataUpdater<ProgramInterfaceStartData>;
  updateTimeout: DataUpdater<ProgramInterfaceStartData['timeout']>;
  reset: () => void;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const update: DataUpdater<ProgramInterfaceStartData> = (field, value) => {
    setConfig(
      produce((draft: ProgramInterfaceStartData) => {
        draft[field] = value;
      })
    );
  };

  const updateTimeout: DataUpdater<ProgramInterfaceStartData['timeout']> = (field, value) => {
    setConfig(
      produce(draft => {
        draft.timeout[field] = value;
      })
    );
  };

  const reset = () =>
    setConfig(
      produce(draft => {
        draft.javaClass = config.initConfig.javaClass;
        draft.exceptionHandler = config.initConfig.exceptionHandler;
        draft.timeout = config.initConfig.timeout;
      })
    );

  return {
    ...config,
    update,
    updateTimeout,
    reset
  };
}
