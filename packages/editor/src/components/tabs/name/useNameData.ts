import { useDataContext } from '../../../context';
import { NameData, Document } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { useCallback } from 'react';
import { Consumer } from '../../../types/lambda';

export function useNameData(): {
  data: NameData;
  initData: NameData;
  updateName: Consumer<string>;
  updateDescription: Consumer<string>;
  updateDocs: Consumer<Document[]>;
  updateTags: Consumer<string[]>;
  resetData: () => void;
} {
  const { data, initData, setData } = useDataContext();

  const updateName = useCallback<Consumer<string>>(
    name =>
      setData(
        produce(draft => {
          draft.name = name;
        })
      ),
    [setData]
  );

  const updateDescription = useCallback<Consumer<string>>(
    description =>
      setData(
        produce(draft => {
          draft.description = description;
        })
      ),
    [setData]
  );

  const updateDocs = useCallback<Consumer<Document[]>>(
    docs =>
      setData(
        produce(draft => {
          draft.docs = docs;
        })
      ),
    [setData]
  );

  const updateTags = useCallback<Consumer<string[]>>(
    tags =>
      setData(
        produce(draft => {
          draft.tags = tags;
        })
      ),
    [setData]
  );

  const resetData = useCallback(
    () =>
      setData(
        produce(draft => {
          draft.name = initData.name;
          draft.description = initData.description;
          draft.docs = initData.docs;
          draft.tags = initData.tags;
        })
      ),
    [setData, initData]
  );

  return { data, initData, updateName, updateDescription, updateDocs, updateTags, resetData };
}
