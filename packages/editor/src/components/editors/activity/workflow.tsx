import { memo, ReactNode } from 'react';
import InscriptionEditor from '../InscriptionEditor';
import { ElementType } from '@axonivy/inscription-protocol';
import NameEditor from '../NameEditor';
import { IvyIcons } from '@axonivy/editor-icons';
import {
  useCasePart,
  useCodePart,
  useDialogCallPart,
  useNamePart,
  useOutputPart,
  useTaskPart,
  useSubCallPart,
  useTriggerCallPart
} from '../../../components/parts';

const DialogCallEditor = memo(() => {
  const name = useNamePart();
  const call = useDialogCallPart();
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.UserDialog} parts={[name, call, output]} />;
});

const UserTaskEditor = memo(() => {
  const name = useNamePart();
  const call = useDialogCallPart();
  const task = useTaskPart();
  const casePart = useCasePart();
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.UserTask} parts={[name, task, casePart, call, output]} />;
});

const ScriptEditor = memo(() => {
  const name = useNamePart();
  const output = useOutputPart({ hideCode: true });
  const code = useCodePart();
  return <InscriptionEditor icon={IvyIcons.Script} parts={[name, output, code]} />;
});

const SubProcessCallEditor = memo(() => {
  const name = useNamePart();
  const call = useSubCallPart();
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.Sub} parts={[name, call, output]} />;
});

const TriggerEditor = memo(() => {
  const name = useNamePart();
  const call = useTriggerCallPart();
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.Trigger} parts={[name, call, output]} />;
});

export const workflowActivityEditors = new Map<ElementType, ReactNode>([
  ['DialogCall', <DialogCallEditor />],
  ['UserTask', <UserTaskEditor />],
  ['Script', <ScriptEditor />],
  ['EmbeddedProcessElement', <NameEditor icon={IvyIcons.Sub} hideTags={true} />],
  ['SubProcessCall', <SubProcessCallEditor />],
  ['TriggerCall', <TriggerEditor />]
]);
