import { IvyIcons } from '@axonivy/editor-icons';
import { ElementType } from '@axonivy/inscription-protocol';
import { memo, ReactNode } from 'react';
import InscriptionEditor from '../InscriptionEditor';
import NameEditor from '../NameEditor';
import { useCasePart, useNamePart, useOutputPart, useSingleTaskPart, useStartPart } from '../../../components/parts';

const RequestStartEditor = memo(() => {
  const name = useNamePart();
  const start = useStartPart();
  const request = { name: 'Request', content: <h1>Request</h1> };
  const trigger = { name: 'Trigger', content: <h1>Trigger</h1> };
  const singleTask = useSingleTaskPart({ showPersist: true });
  const casePart = useCasePart();
  return <InscriptionEditor icon={IvyIcons.Start} parts={[name, start, request, trigger, singleTask, casePart]} />;
});

const SignalStartEventEditor = memo(() => {
  const name = useNamePart();
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.Signal} parts={[name, output]} />;
});

const ErrorStartEventEditor = memo(() => {
  const name = useNamePart();
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.ErrorEvent} parts={[name, output]} />;
});

export const startEventEditors = new Map<ElementType, ReactNode>([
  ['RequestStart', <RequestStartEditor />],
  ['SignalStartEvent', <SignalStartEventEditor />],
  ['ProgramStart', <NameEditor icon={IvyIcons.StartProgram} />],
  ['ErrorStartEvent', <ErrorStartEventEditor />]
]);
