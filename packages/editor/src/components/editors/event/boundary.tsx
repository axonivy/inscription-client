import { IvyIcons } from '@axonivy/editor-icons';
import { ElementType } from '@axonivy/inscription-protocol';
import { memo, ReactNode } from 'react';
import { useNameTab, useOutputTab } from '../../../components/tabs';
import InscriptionEditor from '../InscriptionEditor';

const ErrorBoundaryEventEditor = memo(() => {
  const nameTab = useNameTab();
  const outputTab = useOutputTab();
  return <InscriptionEditor icon={IvyIcons.ErrorEvent} tabs={[nameTab, outputTab]} />;
});

const SignalBoundaryEventEditor = memo(() => {
  const nameTab = useNameTab();
  const outputTab = useOutputTab();
  return <InscriptionEditor icon={IvyIcons.Signal} tabs={[nameTab, outputTab]} />;
});

export const boundaryEventEditors = new Map<ElementType, ReactNode>([
  ['ErrorBoundaryEvent', <ErrorBoundaryEventEditor />],
  ['SignalBoundaryEvent', <SignalBoundaryEventEditor />]
]);
