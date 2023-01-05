import { IvyIcons } from '@axonivy/editor-icons';
import { EventEditorType } from '@axonivy/inscription-core';
import NameEditor from '../NameEditor';

export const embeddedEventEditors = new Map<EventEditorType.Embedded, JSX.Element>([
  ['EmbeddedStart', <NameEditor title='Embedded Start Event' icon={IvyIcons.Start} />],
  ['EmbeddedEnd', <NameEditor title='Embedded End Event' icon={IvyIcons.End} />]
]);
