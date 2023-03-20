import { useConfigDataContext } from '../../../context';
import { EndPageData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { useCallback } from 'react';
import { Consumer } from '../../../types/lambda';

export function useEndPageData(): {
  data: EndPageData;
  defaultData: EndPageData;
  updatePage: Consumer<string>;
} {
  const { config, defaultData, setConfig } = useConfigDataContext();

  const updatePage = useCallback<Consumer<string>>(
    page =>
      setConfig(
        produce(draft => {
          draft.page = page;
        })
      ),
    [setConfig]
  );

  return { data: config, defaultData, updatePage };
}
