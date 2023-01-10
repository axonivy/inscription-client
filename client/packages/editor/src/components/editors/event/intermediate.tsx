import { IvyIcons } from '@axonivy/editor-icons';
import { EventEditorType } from '@axonivy/inscription-core';
import { memo } from 'react';
import { useCaseTab, useEndPageTab, useNameTab, useOutputTab, useTaskTab } from '../../../components/tabs';
import InscriptionEditor from '../InscriptionEditor';
import NameEditor from '../NameEditor';

const TaskSwitchEventEditor = memo(() => {
  const nameTab = useNameTab();
  const outputTab = useOutputTab();
  const taskTab = useTaskTab();
  const caseTab = useCaseTab();
  const endPageTab = useEndPageTab();
  return <InscriptionEditor icon={IvyIcons.Task} tabs={[nameTab, outputTab, taskTab, caseTab, endPageTab]} />;
});

export const intermediateEventEditors = new Map<EventEditorType.Intermediate, JSX.Element>([
  ['TaskSwitchEvent', <TaskSwitchEventEditor />],
  ['WaitEvent', <NameEditor icon={IvyIcons.Wait} />]
]);
