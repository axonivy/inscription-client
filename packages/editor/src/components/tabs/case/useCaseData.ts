import { CaseData, CustomField } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { useCallback } from 'react';
import { useDataContext } from '../../../context';

export function useCaseData(): {
  data: CaseData;
  updateName: (name: string) => void;
  updateDescription: (name: string) => void;
  updateCategory: (category: string) => void;
  updateCustomFields: (customFields: CustomField[]) => void;
} {
  const { data, setData } = useDataContext();

  const updateName = useCallback(
    (name: string) => {
      setData(
        produce((draft: CaseData) => {
          if (!draft.config.case) {
            draft.config.case = {};
          }
          draft.config.case.name = name;
        })
      );
    },
    [setData]
  );

  const updateDescription = useCallback(
    (description: string) => {
      setData(
        produce((draft: CaseData) => {
          if (!draft.config.case) {
            draft.config.case = {};
          }
          draft.config.case.description = description;
        })
      );
    },
    [setData]
  );

  const updateCategory = useCallback(
    (category: string) => {
      setData(
        produce((draft: CaseData) => {
          if (!draft.config.case) {
            draft.config.case = {};
          }
          draft.config.case.category = category;
        })
      );
    },
    [setData]
  );

  const updateCustomFields = useCallback(
    (customFields: CustomField[]) => {
      setData(
        produce((draft: CaseData) => {
          if (!draft.config.case) {
            draft.config.case = {};
          }
          draft.config.case.customFields = customFields;
        })
      );
    },
    [setData]
  );

  return { data, updateName, updateDescription, updateCategory, updateCustomFields };
}
