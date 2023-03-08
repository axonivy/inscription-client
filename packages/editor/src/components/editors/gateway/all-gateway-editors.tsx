import { IvyIcons } from '@axonivy/editor-icons';
import { GatewayEditorType } from '@axonivy/inscription-protocol';
import { memo, ReactNode } from 'react';
import { useCaseTab, useEndPageTab, useNameTab, useOutputTab, useTasksTab } from '../../../components/tabs';
import InscriptionEditor from '../InscriptionEditor';
import NameEditor from '../NameEditor';

const AlternativeEditor = memo(() => {
  const nameTab = useNameTab();
  const conditionTab = { name: 'Condition', content: <h1>Condition</h1> };
  return <InscriptionEditor icon={IvyIcons.Alternative} tabs={[nameTab, conditionTab]} />;
});

const JoinEditor = memo(() => {
  const nameTab = useNameTab();
  const outputTab = useOutputTab();
  return <InscriptionEditor icon={IvyIcons.Join} tabs={[nameTab, outputTab]} />;
});

const TaskSwitchGatewayEditor = memo(() => {
  const nameTab = useNameTab();
  const outputTab = useOutputTab();
  const tasksTab = useTasksTab();
  const caseTab = useCaseTab();
  const endPageTab = useEndPageTab();
  return <InscriptionEditor icon={IvyIcons.Tasks} tabs={[nameTab, outputTab, tasksTab, caseTab, endPageTab]} />;
});

export const gatewayEditors = new Map<GatewayEditorType, ReactNode>([
  ['Alternative', <AlternativeEditor />],
  ['Join', <JoinEditor />],
  ['Split', <NameEditor icon={IvyIcons.Split} />],
  ['TaskSwitchGateway', <TaskSwitchGatewayEditor />]
]);
