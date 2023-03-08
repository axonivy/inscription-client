import { IvyIcons } from '@axonivy/editor-icons';
import { EventEditorType } from '@axonivy/inscription-protocol';
import { memo, ReactNode } from 'react';
import { useCaseTab, useNameTab, useOutputTab, useStartTab, useTaskTab } from '../../../components/tabs';
import InscriptionEditor from '../InscriptionEditor';
import NameEditor from '../NameEditor';

const RequestStartEditor = memo(() => {
  const nameTab = useNameTab();
  const startTab = useStartTab();
  const requestTab = { name: 'Request', content: <h1>Request</h1> };
  const triggerTab = { name: 'Trigger', content: <h1>Trigger</h1> };
  const taskTab = useTaskTab({ showPersist: true });
  const caseTab = useCaseTab();
  return <InscriptionEditor icon={IvyIcons.Start} tabs={[nameTab, startTab, requestTab, triggerTab, taskTab, caseTab]} />;
});

const SignalStartEventEditor = memo(() => {
  const nameTab = useNameTab();
  const outputTab = useOutputTab();
  return <InscriptionEditor icon={IvyIcons.Signal} tabs={[nameTab, outputTab]} />;
});

const ErrorStartEventEditor = memo(() => {
  const nameTab = useNameTab();
  const outputTab = useOutputTab();
  return <InscriptionEditor icon={IvyIcons.ErrorEvent} tabs={[nameTab, outputTab]} />;
});

export const startEventEditors = new Map<EventEditorType.Start, ReactNode>([
  ['RequestStart', <RequestStartEditor />],
  ['SignalStartEvent', <SignalStartEventEditor />],
  ['ProgramStart', <NameEditor icon={IvyIcons.StartProgram} />],
  ['ErrorStartEvent', <ErrorStartEventEditor />]
]);
