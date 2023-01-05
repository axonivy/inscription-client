import { IvyIcons } from '@axonivy/editor-icons';
import { EventEditorType } from '@axonivy/inscription-core';
import NameEditor from '../NameEditor';

export const boundaryEventEditors = new Map<EventEditorType.Boundary, JSX.Element>([
  ['ErrorBoundaryEvent', <NameEditor title='Error Boundary Event' icon={IvyIcons.ErrorEvent} />],
  ['SignalBoundaryEvent', <NameEditor title='Signal Boundary Event' icon={IvyIcons.Signal} />]
]);
