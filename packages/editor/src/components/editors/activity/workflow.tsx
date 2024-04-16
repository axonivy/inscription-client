/* eslint-disable react/jsx-key */
import type { ReactNode } from 'react';
import { memo } from 'react';
import InscriptionEditor from '../InscriptionEditor';
import type { ElementType } from '@axonivy/inscription-protocol';
import NameEditor from '../NameEditor';
import { IvyIcons } from '@axonivy/ui-icons';
import {
  useCasePart,
  useDialogCallPart,
  useGeneralPart,
  useOutputPart,
  useTaskPart,
  useSubCallPart,
  useTriggerCallPart
} from '../../../components/parts';

const DialogCallEditor = memo(() => {
  const name = useGeneralPart();
  const dialog = useDialogCallPart();
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.UserDialog} parts={[name, dialog, output]} />;
});

const UserTaskEditor = memo(() => {
  const name = useGeneralPart();
  const dialog = useDialogCallPart({ offline: true });
  const task = useTaskPart();
  const casePart = useCasePart();
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.UserTask} parts={[name, task, casePart, dialog, output]} />;
});

const ScriptEditor = memo(() => {
  const name = useGeneralPart();
  const output = useOutputPart({ showSudo: true, additionalBrowsers: ['cms'] });
  return <InscriptionEditor icon={IvyIcons.Script} parts={[name, output]} />;
});

const SubProcessCallEditor = memo(() => {
  const name = useGeneralPart();
  const call = useSubCallPart();
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.SubActivities} parts={[name, call, output]} />;
});

const TriggerEditor = memo(() => {
  const name = useGeneralPart();
  const call = useTriggerCallPart();
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.Trigger} parts={[name, call, output]} />;
});

export const workflowActivityEditors = new Map<ElementType, ReactNode>([
  ['DialogCall', <DialogCallEditor />],
  ['UserTask', <UserTaskEditor />],
  ['Script', <ScriptEditor />],
  ['EmbeddedProcessElement', <NameEditor icon={IvyIcons.SubActivities} hideTags={true} />],
  ['SubProcessCall', <SubProcessCallEditor />],
  ['TriggerCall', <TriggerEditor />]
]);
