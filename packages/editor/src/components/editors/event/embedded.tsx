import { IvyIcons } from '@axonivy/editor-icons';
import { EventEditorType } from '@axonivy/inscription-protocol';
import NameEditor from '../NameEditor';

export const embeddedEventEditors = new Map<EventEditorType.Embedded, JSX.Element>([
  ['EmbeddedStart', <NameEditor icon={IvyIcons.Start} />],
  ['EmbeddedEnd', <NameEditor icon={IvyIcons.End} />]
]);
