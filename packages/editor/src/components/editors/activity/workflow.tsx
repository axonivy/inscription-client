/* eslint-disable react/jsx-key */
import type { ReactNode } from 'react';
import { memo } from 'react';
import InscriptionEditor from '../InscriptionEditor';
import type { ElementType } from '@axonivy/inscription-protocol';
import NameEditor from '../NameEditor';
import { IvyIcons } from '@axonivy/editor-icons';
import {
  useCasePart,
  useOutputScriptPart,
  useDialogCallPart,
  useGeneralPart,
  useOutputPart,
  useTaskPart,
  useSubCallPart,
  useTriggerCallPart
} from '../../../components/parts';

const DialogCallEditor = memo(() => {
  const name = useGeneralPart();
  const call = useDialogCallPart();
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.UserDialog} parts={[name, call, output]} />;
});

const UserTaskEditor = memo(() => {
  const name = useGeneralPart();
  const call = useDialogCallPart();
  const task = useTaskPart();
  const casePart = useCasePart();
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.UserTask} parts={[name, task, casePart, call, output]} />;
});

const ScriptEditor = memo(() => {
  const name = useGeneralPart();
  const output = useOutputPart({ hideCode: true, additionalBrowsers: ['cms'] });
  const code = useOutputScriptPart();
  return <InscriptionEditor icon={IvyIcons.Script} parts={[name, output, code]} />;
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
