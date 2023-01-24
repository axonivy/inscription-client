import { CaseData, CustomField } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { useCallback } from 'react';
import { Consumer } from '../../../types/lambda';
import { useDataContext } from '../../../context';

export function useCaseData(): {
  data: CaseData;
  updateName: Consumer<string>;
  updateDescription: Consumer<string>;
  updateCategory: Consumer<string>;
  updateCustomFields: Consumer<CustomField[]>;
} {
  const { data, setData } = useDataContext();

  const updateName = useCallback<Consumer<string>>(
    name =>
      setData(
        produce<CaseData>(draft => {
          if (!draft.config.case) {
            draft.config.case = {};
          }
          draft.config.case.name = name;
        })
      ),
    [setData]
  );

  const updateDescription = useCallback<Consumer<string>>(
    description =>
      setData(
        produce<CaseData>(draft => {
          if (!draft.config.case) {
            draft.config.case = {};
          }
          draft.config.case.description = description;
        })
      ),
    [setData]
  );

  const updateCategory = useCallback<Consumer<string>>(
    category =>
      setData(
        produce<CaseData>(draft => {
          if (!draft.config.case) {
            draft.config.case = {};
          }
          draft.config.case.category = category;
        })
      ),
    [setData]
  );

  const updateCustomFields = useCallback<Consumer<CustomField[]>>(
    customFields =>
      setData(
        produce<CaseData>(draft => {
          if (!draft.config.case) {
            draft.config.case = {};
          }
          draft.config.case.customFields = customFields;
        })
      ),
    [setData]
  );

  return { data, updateName, updateDescription, updateCategory, updateCustomFields };
}
