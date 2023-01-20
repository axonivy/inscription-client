import { IvyIcons } from '@axonivy/editor-icons';
import { EventEditorType } from '@axonivy/inscription-protocol';
import { ReactNode } from 'react';
import NameEditor from '../NameEditor';

export const callSubEventEditors = new Map<EventEditorType.CallSub, ReactNode>([
  ['CallSubStart', <NameEditor icon={IvyIcons.SubStart} />],
  ['CallSubEnd', <NameEditor icon={IvyIcons.SubEnd} />]
]);
