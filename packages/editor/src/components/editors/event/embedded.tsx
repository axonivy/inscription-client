import { IvyIcons } from '@axonivy/editor-icons';
import { EventEditorType } from '@axonivy/inscription-protocol';
import { ReactNode } from 'react';
import NameEditor from '../NameEditor';

export const embeddedEventEditors = new Map<EventEditorType.Embedded, ReactNode>([
  ['EmbeddedStart', <NameEditor icon={IvyIcons.Start} />],
  ['EmbeddedEnd', <NameEditor icon={IvyIcons.End} />]
]);
