import { ConfigDataContext, useConfigDataContext } from '../../../context';
import { EndPageData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { DataUpdater } from '../../../types/lambda';

export function useEndPageData(): ConfigDataContext<EndPageData> & {
  update: DataUpdater<EndPageData>;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const update: DataUpdater<EndPageData> = (field, value) => {
    setConfig(produce(draft => (draft[field] = value)));
  };

  return { ...config, update };
}
