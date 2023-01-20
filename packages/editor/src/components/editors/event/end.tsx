import { IvyIcons } from '@axonivy/editor-icons';
import { EventEditorType } from '@axonivy/inscription-protocol';
import { ReactNode } from 'react';
import NameEditor from '../NameEditor';

export const endEventEditors = new Map<EventEditorType.End, ReactNode>([
  ['TaskEnd', <NameEditor icon={IvyIcons.End} />],
  ['TaskEndPage', <NameEditor icon={IvyIcons.EndPage} />],
  ['ErrorEnd', <NameEditor icon={IvyIcons.ErrorEvent} />]
]);
