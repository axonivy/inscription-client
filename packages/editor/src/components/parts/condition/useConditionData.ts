import { ConditionData } from '@axonivy/inscription-protocol';
import { produce } from 'immer';
import { Consumer } from '../../../types/lambda';
import { ConfigDataContext, useConfigDataContext } from '../../../context';

export function useConditionData(): ConfigDataContext<ConditionData> & {
  updateCondition: Consumer<Record<string, string>>;
} {
  const { setConfig, ...config } = useConfigDataContext();

  const updateCondition = (conditions: Record<string, string>) =>
    setConfig(
      produce(draft => {
        draft.conditions = conditions;
      })
    );

  return { ...config, updateCondition };
}
