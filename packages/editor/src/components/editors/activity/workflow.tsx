import { memo, ReactNode } from 'react';
import {
  useCaseTab,
  useCodeTab,
  useDialogCallTab,
  useNameTab,
  useOutputTab,
  useSubCallTab,
  useTaskTab,
  useTriggerCallTab
} from '../../tabs';
import InscriptionEditor from '../InscriptionEditor';
import { ElementType } from '@axonivy/inscription-protocol';
import NameEditor from '../NameEditor';
import { IvyIcons } from '@axonivy/editor-icons';

const DialogCallEditor = memo(() => {
  const nameTab = useNameTab();
  const callTab = useDialogCallTab();
  const outputTab = useOutputTab();
  return <InscriptionEditor icon={IvyIcons.UserDialog} tabs={[nameTab, callTab, outputTab]} />;
});

const UserTaskEditor = memo(() => {
  const nameTab = useNameTab();
  const callTab = useDialogCallTab();
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

const SubProcessCallEditor = memo(() => {
  const nameTab = useNameTab();
  const callTab = useSubCallTab();
  const outputTab = useOutputTab();
  return <InscriptionEditor icon={IvyIcons.Sub} tabs={[nameTab, callTab, outputTab]} />;
});

const TriggerEditor = memo(() => {
  const nameTab = useNameTab();
  const callTab = useTriggerCallTab();
  const outputTab = useOutputTab();
  return <InscriptionEditor icon={IvyIcons.Trigger} tabs={[nameTab, callTab, outputTab]} />;
});

export const workflowActivityEditors = new Map<ElementType, ReactNode>([
  ['DialogCall', <DialogCallEditor />],
  ['UserTask', <UserTaskEditor />],
  ['Script', <ScriptEditor />],
  ['EmbeddedProcessElement', <NameEditor icon={IvyIcons.Sub} hideTags={true} />],
  ['SubProcessCall', <SubProcessCallEditor />],
  ['TriggerCall', <TriggerEditor />]
]);
