import { IvyIcons } from '@axonivy/editor-icons';
import { EventEditorType } from '@axonivy/inscription-core';
import NameEditor from '../NameEditor';

export const htmlDialogEventEditors = new Map<EventEditorType.HtmlDialog, JSX.Element>([
  ['HtmlDialogStart', <NameEditor title='User Dialog Start' icon={IvyIcons.InitStart} />],
  ['HtmlDialogMethodStart', <NameEditor title='User Dialog Method Start' icon={IvyIcons.MethodStart} />],
  ['HtmlDialogEventStart', <NameEditor title='User Dialog Event Start' icon={IvyIcons.EventStart} />],
  ['HtmlDialogExit', <NameEditor title='User Dialog Exit End' icon={IvyIcons.ExitEnd} />],
  ['HtmlDialogEnd', <NameEditor title='User Dialog Process End' icon={IvyIcons.End} />]
]);
