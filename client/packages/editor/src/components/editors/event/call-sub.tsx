import { IvyIcons } from '@axonivy/editor-icons';
import { EventEditorType } from '@axonivy/inscription-core';
import NameEditor from '../NameEditor';

export const callSubEventEditors = new Map<EventEditorType.CallSub, JSX.Element>([
  ['CallSubStart', <NameEditor icon={IvyIcons.SubStart} />],
  ['CallSubEnd', <NameEditor icon={IvyIcons.SubEnd} />]
]);
