import type { CaseData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import type { DataUpdater } from '../../../types/lambda.js';
import type { ConfigDataContext} from '../../../context/index.js';
import { useConfigDataContext } from '../../../context/index.js';

export function useCaseData(): ConfigDataContext<CaseData> & {
  update: DataUpdater<CaseData['case']>;
  resetData: () => void;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const update: DataUpdater<CaseData['case']> = (field, value) => {
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
    update,
    resetData
  };
}
