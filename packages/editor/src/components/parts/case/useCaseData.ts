import { CaseData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { Updater } from '../../../types/lambda';
import { ConfigDataContext, useConfigDataContext } from '../../../context';

export function useCaseData(): ConfigDataContext<CaseData> & {
  updater: Updater<CaseData['case']>;
  resetData: () => void;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const updater: Updater<CaseData['case']> = (field, value) => {
    setConfig(
      produce(draft => {
        draft.case[field] = value;
      })
    );
  };

  const resetData = () =>
    setConfig(
      produce(draft => {
        draft.case = config.initConfig.case;
      })
    );

  return {
    ...config,
    updater,
    resetData
  };
}
