import { IvyIcons } from '@axonivy/editor-icons';
import { ElementType } from '@axonivy/inscription-protocol';
import { memo, ReactNode } from 'react';
import InscriptionEditor from '../InscriptionEditor';
import NameEditor from '../NameEditor';
import {
  useCasePart,
  useSignalCatchPart,
  useNamePart,
  useOutputPart,
  useSingleTaskPart,
  useStartPart,
  useErrorCatchPart
} from '../../../components/parts';

const RequestStartEditor = memo(() => {
  const name = useNamePart();
  const start = useStartPart();
  const singleTask = useSingleTaskPart({ showPersist: true });
  const casePart = useCasePart();
  return <InscriptionEditor icon={IvyIcons.Start} parts={[name, start, /*request, trigger,*/ singleTask, casePart]} />;
});

const SignalStartEventEditor = memo(() => {
  const name = useNamePart();
  const signal = useSignalCatchPart();
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.Signal} parts={[name, signal, output]} />;
});

const ErrorStartEventEditor = memo(() => {
  const name = useNamePart();
  const error = useErrorCatchPart();
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.ErrorEvent} parts={[name, error, output]} />;
});

export const startEventEditors = new Map<ElementType, ReactNode>([
  ['RequestStart', <RequestStartEditor />],
  ['SignalStartEvent', <SignalStartEventEditor />],
  ['ProgramStart', <NameEditor icon={IvyIcons.StartProgram} />],
  ['ErrorStartEvent', <ErrorStartEventEditor />]
]);
