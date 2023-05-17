import { PartProps, usePartState } from '../../props';
import { useConditionData } from './useConditionData';
import { useClient, useEditorContext } from '../../../context';
import { useEffect, useState } from 'react';
import { Condition, Element } from './condition';
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
      const source: Element = {
        name: `source ${fid}`,
        pid: 'source pid',
        type: { id: 'TaskEnd', impl: 'impl', label: 'label', shortLabel: 'shortlabel', description: 'description', iconId: 'iconid' }
      };
      const target: Element = {
        name: `target ${fid}`,
        pid: 'target pid',
        type: { id: 'TaskEnd', impl: 'impl', label: 'label', shortLabel: 'shortlabel', description: 'description', iconId: 'iconid' }
      };
      setConditions(conds => Condition.replace(conds, fid, { name: 'name', pid: fid, source, target }));
      // client.data(pid).then(data => setConditions(conds => Condition.replace(conds, fid, data)));
    });
  }, [client, conditionData.conditions, editorContext.pid]);

  return <ConditionTable data={conditions} onChange={conditions => updateCondition(Condition.to(conditions))} />;
};
