import { ConditionData } from '@axonivy/inscription-protocol';
import produce from 'immer';
import { useCallback } from 'react';
import { Consumer } from '../../../types/lambda';
import { useConfigDataContext } from '../../../context';

export function useConditionData(): {
  conditionData: ConditionData;
  defaultData: ConditionData;
  updateCondition: Consumer<Record<string, string>>;
} {
  const { config, defaultData, setConfig } = useConfigDataContext();

  const updateCondition = useCallback<Consumer<Record<string, string>>>(
    conditions =>
      setConfig(
        produce(draft => {
          draft.conditions = conditions;
        })
      ),
    [setConfig]
  );

  return { conditionData: config, defaultData, updateCondition: updateCondition };
}
