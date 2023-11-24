import type { ConditionData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import type { DataUpdater } from '../../../types/lambda.js';
import type { ConfigDataContext} from '../../../context/index.js';
import { useConfigDataContext } from '../../../context/index.js';

export function useConditionData(): ConfigDataContext<ConditionData> & {
  update: DataUpdater<ConditionData>;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const update: DataUpdater<ConditionData> = (field, value) => {
    setConfig(
      produce(draft => {
        draft[field] = value;
      })
    );
  };

  return { ...config, update };
}
