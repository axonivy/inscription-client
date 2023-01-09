import { IvyIcons } from '@axonivy/editor-icons';
import { EventEditorType } from '@axonivy/inscription-core';
import NameEditor from '../NameEditor';

export const webServiceEventEditors = new Map<EventEditorType.Webservice, JSX.Element>([
  ['WebserviceStart', <NameEditor title='Web Service Process Start' icon={IvyIcons.WebService} />],
  ['WebserviceEnd', <NameEditor title='Web Service Process End' icon={IvyIcons.WebService} />]
]);
