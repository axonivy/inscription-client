import { IvyIcons } from '@axonivy/editor-icons';
import { EventEditorType } from '@axonivy/inscription-protocol';
import NameEditor from '../NameEditor';

export const htmlDialogEventEditors = new Map<EventEditorType.HtmlDialog, JSX.Element>([
  ['HtmlDialogStart', <NameEditor icon={IvyIcons.InitStart} />],
  ['HtmlDialogMethodStart', <NameEditor icon={IvyIcons.MethodStart} />],
  ['HtmlDialogEventStart', <NameEditor icon={IvyIcons.EventStart} />],
  ['HtmlDialogExit', <NameEditor icon={IvyIcons.ExitEnd} />],
  ['HtmlDialogEnd', <NameEditor icon={IvyIcons.End} />]
]);
