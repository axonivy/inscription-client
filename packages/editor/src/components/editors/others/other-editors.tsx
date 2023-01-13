import { IvyIcons } from '@axonivy/editor-icons';
import { OtherEditorType } from '@axonivy/inscription-core';
import NameEditor from '../NameEditor';

export const otherEditors = new Map<OtherEditorType, JSX.Element>([['ProcessAnnotation', <NameEditor icon={IvyIcons.Note} />]]);
