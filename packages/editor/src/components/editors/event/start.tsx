import { IvyIcons } from '@axonivy/editor-icons';
import { EventEditorType } from '@axonivy/inscription-protocol';
import { memo, ReactNode } from 'react';
import { useCaseTab, useNameTab, useStartTab, useTaskTab } from '../../../components/tabs';
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

export const startEventEditors = new Map<EventEditorType.Start, ReactNode>([
  ['RequestStart', <RequestStartEditor />],
  ['SignalStartEvent', <NameEditor icon={IvyIcons.Signal} />],
  ['ProgramStart', <NameEditor icon={IvyIcons.StartProgram} />],
  ['ErrorStartEvent', <NameEditor icon={IvyIcons.ErrorEvent} />]
]);
