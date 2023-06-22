import { useDataContext } from '../../../context';
import { NameData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { useCallback } from 'react';
import { Updater } from '../../../types/lambda';

export function useNameData(): {
  data: NameData;
  initData: NameData;
  updater: Updater<NameData>;
  resetData: () => void;
} {
  const { data, initData, setData } = useDataContext();

  const updater: Updater<NameData> = (field, value) => {
    setData(
      produce((draft: NameData) => {
        draft[field] = value;
      })
    );
  };

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

  return { data, initData, updater, resetData };
}
