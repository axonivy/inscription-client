import type { ConfigDataContext} from '../../../context/index.js';
import { useConfigDataContext } from '../../../context/index.js';
import type { EndPageData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import type { DataUpdater } from '../../../types/lambda.js';

export function useEndPageData(): ConfigDataContext<EndPageData> & {
  update: DataUpdater<EndPageData>;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const update: DataUpdater<EndPageData> = (field, value) => {
    setConfig(
      produce(draft => {
        draft[field] = value;
      })
    );
  };

  return { ...config, update };
}
