import { IvyIcons } from '@axonivy/editor-icons';
import { EventEditorType } from '@axonivy/inscription-core';
import NameEditor from '../NameEditor';

export const webServiceEventEditors = new Map<EventEditorType.Webservice, JSX.Element>([
  ['WebserviceStart', <NameEditor icon={IvyIcons.WebService} />],
  ['WebserviceEnd', <NameEditor icon={IvyIcons.WebService} />]
]);
