import { CaseData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { useCallback } from 'react';
import { Updater } from '../../../types/lambda';
import { useConfigDataContext } from '../../../context';

export function useCaseData(): {
  caseData: CaseData;
  defaultData: CaseData;
  initData: CaseData;
  updater: Updater<CaseData['case']>;
  resetData: () => void;
} {
  const { config, defaultConfig, initConfig, setConfig } = useConfigDataContext();

  const updater: Updater<CaseData['case']> = (field, value) => {
    setConfig(
      produce(draft => {
        draft.case[field] = value;
      })
    );
  };

  const resetData = useCallback<() => void>(
    () =>
      setConfig(
        produce(draft => {
          draft.case = initConfig.case;
        })
      ),
    [initConfig.case, setConfig]
  );

  return {
    caseData: config,
    defaultData: defaultConfig,
    initData: initConfig,
    updater,
    resetData
  };
}
