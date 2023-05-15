import { IvyIcons } from '@axonivy/editor-icons';
import { ElementType } from '@axonivy/inscription-protocol';
import { memo, ReactNode } from 'react';
import InscriptionEditor from '../InscriptionEditor';
import { useNamePart, useOutputPart } from '../../../components/parts';

const ErrorBoundaryEventEditor = memo(() => {
  const name = useNamePart();
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.ErrorEvent} parts={[name, output]} />;
});

const SignalBoundaryEventEditor = memo(() => {
  const name = useNamePart();
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.Signal} parts={[name, output]} />;
});

export const boundaryEventEditors = new Map<ElementType, ReactNode>([
  ['ErrorBoundaryEvent', <ErrorBoundaryEventEditor />],
  ['SignalBoundaryEvent', <SignalBoundaryEventEditor />]
]);
