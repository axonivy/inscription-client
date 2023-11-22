/* eslint-disable react/jsx-key */
import { IvyIcons } from '@axonivy/editor-icons';
import type { ElementType } from '@axonivy/inscription-protocol';
import type { ReactNode } from 'react';
import { memo } from 'react';
import InscriptionEditor from '../InscriptionEditor';
import { useSignalCatchPart, useGeneralPart, useOutputPart, useErrorCatchPart } from '../../../components/parts';

const ErrorBoundaryEventEditor = memo(() => {
  const name = useGeneralPart();
  const error = useErrorCatchPart();
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.ErrorStart} parts={[name, error, output]} />;
});

const SignalBoundaryEventEditor = memo(() => {
  const name = useGeneralPart();
  const signal = useSignalCatchPart({ makroSupport: true, withBrowser: true });
  const output = useOutputPart();
  return <InscriptionEditor icon={IvyIcons.StartSignalOutline} parts={[name, signal, output]} />;
});

export const boundaryEventEditors = new Map<ElementType, ReactNode>([
  ['ErrorBoundaryEvent', <ErrorBoundaryEventEditor />],
  ['SignalBoundaryEvent', <SignalBoundaryEventEditor />]
]);
