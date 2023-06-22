import { ConfigDataContext, useConfigDataContext } from '../../../context';
import { OutputData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { Consumer, Updater } from '../../../types/lambda';

export function useOutputData(): ConfigDataContext<OutputData> & {
  updater: Updater<OutputData['output']>;
  updateSudo: Consumer<boolean>;
  resetCode: () => void;
  resetOutput: Consumer<boolean | undefined>;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const updater: Updater<OutputData['output']> = (field, value) => {
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
    updater,
    updateSudo,
    resetCode,
    resetOutput
  };
}
