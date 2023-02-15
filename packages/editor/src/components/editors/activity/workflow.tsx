import { memo, ReactNode } from 'react';
import { useCallTab, useCaseTab, useCodeTab, useNameTab, useOutputTab, useTaskTab } from '../../tabs';
import InscriptionEditor from '../InscriptionEditor';
import { ActivityEditorType } from '@axonivy/inscription-protocol';
import NameEditor from '../NameEditor';
import { IvyIcons } from '@axonivy/editor-icons';

const DialogCallEditor = memo(() => {
  const nameTab = useNameTab();
  const callTab = useCallTab();
  const outputTab = useOutputTab();
  return <InscriptionEditor icon={IvyIcons.UserDialog} tabs={[nameTab, callTab, outputTab]} />;
});

const UserTaskEditor = memo(() => {
  const nameTab = useNameTab();
  const callTab = useCallTab();
  const taskTab = useTaskTab();
  const caseTab = useCaseTab();
  const outputTab = useOutputTab();
  return <InscriptionEditor icon={IvyIcons.UserTask} tabs={[nameTab, taskTab, caseTab, callTab, outputTab]} />;
});

const ScriptEditor = memo(() => {
  const nameTab = useNameTab();
  const outputTab = useOutputTab({ hideCode: true });
  const codeTab = useCodeTab();
  return <InscriptionEditor icon={IvyIcons.Script} tabs={[nameTab, outputTab, codeTab]} />;
});

export const workflowActivityEditors = new Map<ActivityEditorType.General, ReactNode>([
  ['DialogCall', <DialogCallEditor />],
  ['UserTask', <UserTaskEditor />],
  ['Script', <ScriptEditor />],
  ['EmbeddedProcessElement', <NameEditor icon={IvyIcons.Sub} hideTags={true} />],
  ['SubProcessCall', <NameEditor icon={IvyIcons.Sub} />],
  ['TriggerCall', <NameEditor icon={IvyIcons.Trigger} />]
]);
