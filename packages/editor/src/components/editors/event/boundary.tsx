import { IvyIcons } from '@axonivy/editor-icons';
import { EventEditorType } from '@axonivy/inscription-protocol';
import { ReactNode } from 'react';
import NameEditor from '../NameEditor';

export const boundaryEventEditors = new Map<EventEditorType.Boundary, ReactNode>([
  ['ErrorBoundaryEvent', <NameEditor icon={IvyIcons.ErrorEvent} />],
  ['SignalBoundaryEvent', <NameEditor icon={IvyIcons.Signal} />]
]);
