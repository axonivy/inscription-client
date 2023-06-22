import { ConditionData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { DataUpdater } from '../../../types/lambda';
import { ConfigDataContext, useConfigDataContext } from '../../../context';

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
