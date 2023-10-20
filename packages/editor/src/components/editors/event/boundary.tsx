/* eslint-disable react/jsx-key */
import { IvyIcons } from '@axonivy/editor-icons';
import { ElementType } from '@axonivy/inscription-protocol';
import { memo, ReactNode } from 'react';
import InscriptionEditor from '../InscriptionEditor';
import { useSignalCatchPart, useNamePart, useOutputPart, useErrorCatchPart } from '../../../components/parts';

const ErrorBoundaryEventEditor = memo(() => {
  const name = useNamePart();
  const error = useErrorCatchPart();
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.ErrorEvent} parts={[name, error, output]} />;
});

const SignalBoundaryEventEditor = memo(() => {
  const name = useNamePart();
  const signal = useSignalCatchPart({ makroSupport: true, withBrowser: true });
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.Signal} parts={[name, signal, output]} />;
});

export const boundaryEventEditors = new Map<ElementType, ReactNode>([
  ['ErrorBoundaryEvent', <ErrorBoundaryEventEditor />],
  ['SignalBoundaryEvent', <SignalBoundaryEventEditor />]
]);
