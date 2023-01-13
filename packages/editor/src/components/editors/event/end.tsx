import { IvyIcons } from '@axonivy/editor-icons';
import { EventEditorType } from '@axonivy/inscription-protocol';
import NameEditor from '../NameEditor';

export const endEventEditors = new Map<EventEditorType.End, JSX.Element>([
  ['TaskEnd', <NameEditor icon={IvyIcons.End} />],
  ['TaskEndPage', <NameEditor icon={IvyIcons.EndPage} />],
  ['ErrorEnd', <NameEditor icon={IvyIcons.ErrorEvent} />]
]);
