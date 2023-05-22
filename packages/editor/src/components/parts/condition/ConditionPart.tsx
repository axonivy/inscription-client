import { PartProps, usePartState } from '../../props';
import { useConditionData } from './useConditionData';
import { useClient, useEditorContext } from '../../../context';
import { useEffect, useState } from 'react';
import { Condition } from './condition';
import { PID } from '../../../utils/pid';
import ConditionTable from './ConditionTable';

export function useConditionPart(): PartProps {
  const { conditionData, defaultData } = useConditionData();
  const state = usePartState(defaultData.conditions, conditionData.conditions, []);
  return { name: 'Condition', state: state, content: <ConditionPart /> };
}

const ConditionPart = () => {
  const { conditionData, updateCondition } = useConditionData();
  const [conditions, setConditions] = useState(Condition.of(conditionData.conditions));

  const editorContext = useEditorContext();
  const client = useClient();
  useEffect(() => {
    Object.keys(conditionData.conditions).forEach(fid => {
      const pid = PID.createChild(PID.processId(editorContext.pid), fid);
      client.connectorOf(pid).then(data => setConditions(conds => Condition.replace(conds, fid, data)));
    });
  }, [client, conditionData.conditions, editorContext.pid]);

  return <ConditionTable data={conditions} onChange={conditions => updateCondition(Condition.to(conditions))} />;
};
