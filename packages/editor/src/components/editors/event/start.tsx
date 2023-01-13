import { IvyIcons } from '@axonivy/editor-icons';
import { EventEditorType } from '@axonivy/inscription-core';
import { memo } from 'react';
import { TabState } from '../../../components/props';
import { useCaseTab, useNameTab, useStartTab, useTaskTab } from '../../../components/tabs';
import InscriptionEditor from '../InscriptionEditor';
import NameEditor from '../NameEditor';

const RequestStartEditor = memo(() => {
  const nameTab = useNameTab();
  const startTab = useStartTab();
  const requestTab = { name: 'Request', content: <h1>Request</h1>, state: TabState.EMPTY };
  const triggerTab = { name: 'Trigger', content: <h1>Trigger</h1>, state: TabState.EMPTY };
  const taskTab = useTaskTab();
  const caseTab = useCaseTab();
  return <InscriptionEditor icon={IvyIcons.Start} tabs={[nameTab, startTab, requestTab, triggerTab, taskTab, caseTab]} />;
});

export const startEventEditors = new Map<EventEditorType.Start, JSX.Element>([
  ['RequestStart', <RequestStartEditor />],
  ['SignalStartEvent', <NameEditor icon={IvyIcons.Signal} />],
  ['ProgramStart', <NameEditor icon={IvyIcons.StartProgram} />],
  ['ErrorStartEvent', <NameEditor icon={IvyIcons.ErrorEvent} />]
]);
