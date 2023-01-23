import { IvyIcons } from '@axonivy/editor-icons';
import { OtherEditorType } from '@axonivy/inscription-protocol';
import { ReactNode } from 'react';
import NameEditor from '../NameEditor';

export const otherEditors = new Map<OtherEditorType, ReactNode>([['ProcessAnnotation', <NameEditor icon={IvyIcons.Note} />]]);
