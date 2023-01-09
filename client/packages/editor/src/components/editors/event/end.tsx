import { IvyIcons } from '@axonivy/editor-icons';
import { EventEditorType } from '@axonivy/inscription-core';
import NameEditor from '../NameEditor';

export const endEventEditors = new Map<EventEditorType.End, JSX.Element>([
  ['TaskEnd', <NameEditor title='Process End' icon={IvyIcons.End} />],
  ['TaskEndPage', <NameEditor title='End Page' icon={IvyIcons.EndPage} />],
  ['ErrorEnd', <NameEditor title='Error End Event' icon={IvyIcons.ErrorEvent} />]
]);
