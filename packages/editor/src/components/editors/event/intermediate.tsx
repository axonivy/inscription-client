import { IvyIcons } from '@axonivy/editor-icons';
import { ElementType } from '@axonivy/inscription-protocol';
import { memo, ReactNode } from 'react';
import { useCaseTab, useEndPageTab, useNameTab, useOutputTab, useTaskTab } from '../../../components/tabs';
import InscriptionEditor from '../InscriptionEditor';

const TaskSwitchEventEditor = memo(() => {
  const nameTab = useNameTab();
  const outputTab = useOutputTab();
  const taskTab = useTaskTab();
  const caseTab = useCaseTab();
  const endPageTab = useEndPageTab();
  return <InscriptionEditor icon={IvyIcons.Task} tabs={[nameTab, outputTab, taskTab, caseTab, endPageTab]} />;
});

const WaitEventEditor = memo(() => {
  const nameTab = useNameTab();
  const outputTab = useOutputTab();
  return <InscriptionEditor icon={IvyIcons.Wait} tabs={[nameTab, outputTab]} />;
});

export const intermediateEventEditors = new Map<ElementType, ReactNode>([
  ['TaskSwitchEvent', <TaskSwitchEventEditor />],
  ['WaitEvent', <WaitEventEditor />]
]);
