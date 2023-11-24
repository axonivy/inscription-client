import type { ConfigDataContext} from '../../../context/index.js';
import { useConfigDataContext } from '../../../context/index.js';
import type { OutputData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import type { Consumer, DataUpdater } from '../../../types/lambda.js';

export function useOutputData(): ConfigDataContext<OutputData> & {
  update: DataUpdater<OutputData['output']>;
  updateSudo: Consumer<boolean>;
  resetCode: () => void;
  resetOutput: Consumer<boolean | undefined>;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const update: DataUpdater<OutputData['output']> = (field, value) => {
    setConfig(
      produce(draft => {
        draft.output[field] = value;
      })
    );
  };

  const updateSudo = (sudo: boolean) =>
    setConfig(
      produce(draft => {
        draft.sudo = sudo;
      })
    );

  const resetCode = () =>
    setConfig(
      produce(draft => {
        draft.output.code = config.initConfig.output.code;
        draft.sudo = config.initConfig.sudo;
      })
    );

  const resetOutput = (resetCode?: boolean) =>
    setConfig(
      produce(draft => {
        draft.output.map = config.initConfig.output.map;
        if (resetCode) {
          draft.output.code = config.initConfig.output.code;
        }
      })
    );

  return {
    ...config,
    update,
    updateSudo,
    resetCode,
    resetOutput
  };
}
