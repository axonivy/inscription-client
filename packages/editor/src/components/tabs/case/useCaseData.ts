import { CaseData, CustomField } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { useCallback } from 'react';
import { Consumer } from '../../../types/lambda';
import { useConfigDataContext } from '../../../context';

export function useCaseData(): {
  caseData: CaseData;
  updateName: Consumer<string>;
  updateDescription: Consumer<string>;
  updateCategory: Consumer<string>;
  updateCustomFields: Consumer<CustomField[]>;
} {
  const { config, setConfig } = useConfigDataContext();

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

  const updateCustomFields = useCallback<Consumer<CustomField[]>>(
    customFields =>
      setConfig(
        produce(draft => {
          draft.case.customFields = customFields;
        })
      ),
    [setConfig]
  );

  return { caseData: config, updateName, updateDescription, updateCategory, updateCustomFields };
}
