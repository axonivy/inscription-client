import type { PartProps } from '../../editors/index.js';
import { usePartDirty, usePartState } from '../../editors/index.js';
import { useConditionData } from './useConditionData.js';
import { useMeta, PathContext, useEditorContext, useValidations } from '../../../context/index.js';
import { useEffect, useState } from 'react';
import { Condition } from './condition.js';
import ConditionTable from './ConditionTable.js';
import type { ConditionData } from '@axonivy/inscription-protocol';

export function useConditionPart(): PartProps {
  const { config, initConfig, defaultConfig, update } = useConditionData();
  const compareData = (data: ConditionData) => [data.conditions];
  const validations = useValidations(['conditions']);
  const state = usePartState(compareData(defaultConfig), compareData(config), validations);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return {
    name: 'Condition',
    state: state,
    reset: { dirty, action: () => update('conditions', initConfig.conditions) },
    content: <ConditionPart />
  };
}

const ConditionPart = () => {
  const { config, update } = useConditionData();
  const [conditions, setConditions] = useState<Condition[]>([]);

  const { elementContext } = useEditorContext();
  const { data: outConnectors } = useMeta('meta/connector/out', elementContext, []);
  useEffect(() => {
    setConditions(Condition.of(config.conditions));
    outConnectors.forEach(connector => setConditions(conditions => Condition.replace(conditions, connector)));
  }, [config.conditions, outConnectors]);

  return (
    <PathContext path='conditions'>
      <ConditionTable data={conditions} onChange={conditions => update('conditions', Condition.to(conditions))} />
    </PathContext>
  );
};
