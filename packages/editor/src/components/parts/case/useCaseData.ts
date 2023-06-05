import { CaseData, WfCustomField } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { useCallback } from 'react';
import { Consumer } from '../../../types/lambda';
import { useConfigDataContext } from '../../../context';

export function useCaseData(): {
  caseData: CaseData;
  defaultData: CaseData;
  initData: CaseData;
  updateName: Consumer<string>;
  updateDescription: Consumer<string>;
  updateCategory: Consumer<string>;
  updateCustomFields: Consumer<WfCustomField[]>;
  resetData: () => void;
} {
  const { config, defaultConfig, initConfig, setConfig } = useConfigDataContext();

  const updateName = useCallback<Consumer<string>>(
    name =>
      setConfig(
        produce(draft => {
          draft.case.name = name;
        })
      ),
    [setConfig]
  );

  const updateDescription = useCallback<Consumer<string>>(
    description =>
      setConfig(
        produce(draft => {
          draft.case.description = description;
        })
      ),
    [setConfig]
  );

  const updateCategory = useCallback<Consumer<string>>(
    category =>
      setConfig(
        produce(draft => {
          draft.case.category = category;
        })
      ),
    [setConfig]
  );

  const updateCustomFields = useCallback<Consumer<WfCustomField[]>>(
    customFields =>
      setConfig(
        produce(draft => {
          draft.case.customFields = customFields;
        })
      ),
    [setConfig]
  );

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
    updateName,
    updateDescription,
    updateCategory,
    updateCustomFields,
    resetData
  };
}
