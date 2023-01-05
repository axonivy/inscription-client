import { IvyIcons } from '@axonivy/editor-icons';
import { GatewayEditorType } from '@axonivy/inscription-core';
import { memo } from 'react';
import { TabState } from '../../../components/props';
import { useCaseTab, useEndPageTab, useNameTab, useOutputTab, useTaskTab } from '../../../components/tabs';
import InscriptionEditor from '../InscriptionEditor';
import NameEditor from '../NameEditor';

const AlternativeEditor = memo(() => {
  const nameTab = useNameTab();
  const conditionTab = { name: 'Condition', content: <h1>Condition</h1>, state: TabState.EMPTY };
  return <InscriptionEditor title='Alternative Gateway' icon={IvyIcons.Alternative} tabs={[nameTab, conditionTab]} />;
});

const TaskSwitchGatewayEditor = memo(() => {
  const nameTab = useNameTab();
  const outputTab = useOutputTab();
  const taskTab = useTaskTab();
  const caseTab = useCaseTab();
  const endPageTab = useEndPageTab();
  return <InscriptionEditor title='Task Switch Gateway' icon={IvyIcons.Tasks} tabs={[nameTab, outputTab, taskTab, caseTab, endPageTab]} />;
});

export const gatewayEditors = new Map<GatewayEditorType, JSX.Element>([
  ['Alternative', <AlternativeEditor />],
  ['Join', <NameEditor title='Join Gateway' icon={IvyIcons.Join} />],
  ['Split', <NameEditor title='Split Gateway' icon={IvyIcons.Split} />],
  ['TaskSwitchGateway', <TaskSwitchGatewayEditor />]
]);
