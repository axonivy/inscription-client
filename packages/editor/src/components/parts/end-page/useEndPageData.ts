import { ConfigDataContext, useConfigDataContext } from '../../../context';
import { EndPageData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { useCallback } from 'react';
import { Consumer } from '../../../types/lambda';

export function useEndPageData(): ConfigDataContext<EndPageData> & {
  updatePage: Consumer<string>;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const updatePage = useCallback<Consumer<string>>(
    page =>
      setConfig(
        produce(draft => {
          draft.page = page;
        })
      ),
    [setConfig]
  );

  return { ...config, updatePage };
}
