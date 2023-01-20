import { useDataContext } from '../../../context';
import { NameData, Document } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { useCallback } from 'react';

export function useNameData(): {
  data: NameData;
  updateName: (name: string) => void;
  updateDescription: (name: string) => void;
  updateDocs: (docs: Document[]) => void;
  updateTags: (tags: string[]) => void;
} {
  const { data, setData } = useDataContext();

  const updateName = useCallback(
    (name: string) => {
      setData(
        produce((draft: NameData) => {
          draft.name = name;
        })
      );
    },
    [setData]
  );

  const updateDescription = useCallback(
    (description: string) => {
      setData(
        produce((draft: NameData) => {
          draft.description = description;
        })
      );
    },
    [setData]
  );

  const updateDocs = useCallback(
    (docs: Document[]) => {
      setData(
        produce((draft: NameData) => {
          draft.docs = docs;
        })
      );
    },
    [setData]
  );

  const updateTags = useCallback(
    (tags: string[]) => {
      setData(
        produce((draft: NameData) => {
          draft.tags = tags;
        })
      );
    },
    [setData]
  );

  return { data, updateName, updateDescription, updateDocs, updateTags };
}
