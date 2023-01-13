import { IvyIcons } from '@axonivy/editor-icons';
import { OtherEditorType } from '@axonivy/inscription-protocol';
import NameEditor from '../NameEditor';

export const otherEditors = new Map<OtherEditorType, JSX.Element>([['ProcessAnnotation', <NameEditor icon={IvyIcons.Note} />]]);
