import { PartProps, usePartDirty, usePartState } from '../../props';
import { useConditionData } from './useConditionData';
import { PathContext, useClient, useEditorContext, useValidations } from '../../../context';
import { useEffect, useState } from 'react';
import { Condition } from './condition';
import { PID } from '../../../utils/pid';
import ConditionTable from './ConditionTable';
import { ConditionData } from '@axonivy/inscription-protocol';

export function useConditionPart(): PartProps {
  const { config, initConfig, defaultConfig, update } = useConditionData();
  const compareData = (data: ConditionData) => [data.conditions];
  const validations = useValidations('conditions');
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

  const editorContext = useEditorContext();
  const client = useClient();
  useEffect(() => {
    setConditions(Condition.of(config.conditions));
    Object.keys(config.conditions).forEach(conditionId => {
      const pid = PID.createChild(PID.processId(editorContext.pid), conditionId);
      client.connectorOf(pid).then(data => setConditions(conds => Condition.replace(conds, conditionId, data, editorContext.pid)));
    });
  }, [client, config.conditions, editorContext.pid]);

  return (
    <PathContext path='conditions'>
      <ConditionTable data={conditions} onChange={conditions => update('conditions', Condition.to(conditions))} />;
    </PathContext>
  );
};
