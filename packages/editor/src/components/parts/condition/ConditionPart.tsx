import { PartProps, usePartDirty, usePartState } from '../../props';
import { useConditionData } from './useConditionData';
import { useClient, useEditorContext } from '../../../context';
import { useEffect, useState } from 'react';
import { Condition } from './condition';
import { PID } from '../../../utils/pid';
import ConditionTable from './ConditionTable';

export function useConditionPart(): PartProps {
  const { conditionData, initData, defaultData, updateCondition } = useConditionData();
  const state = usePartState(defaultData.conditions, conditionData.conditions, []);
  const dirty = usePartDirty(initData.conditions, conditionData.conditions);
  return {
    name: 'Condition',
    state: state,
    reset: { dirty, action: () => updateCondition(initData.conditions) },
    content: <ConditionPart />
  };
}

const ConditionPart = () => {
  const { conditionData, updateCondition } = useConditionData();
  const [conditions, setConditions] = useState<Condition[]>([]);

  const editorContext = useEditorContext();
  const client = useClient();
  useEffect(() => {
    setConditions(Condition.of(conditionData.conditions));
    Object.keys(conditionData.conditions).forEach(conditionId => {
      const pid = PID.createChild(PID.processId(editorContext.pid), conditionId);
      client.connectorOf(pid).then(data => setConditions(conds => Condition.replace(conds, conditionId, data, editorContext.pid)));
    });
  }, [client, conditionData.conditions, editorContext.pid]);

  return <ConditionTable data={conditions} onChange={conditions => updateCondition(Condition.to(conditions))} />;
};
