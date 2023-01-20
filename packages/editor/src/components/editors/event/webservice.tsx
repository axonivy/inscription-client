import { IvyIcons } from '@axonivy/editor-icons';
import { EventEditorType } from '@axonivy/inscription-protocol';
import { ReactNode } from 'react';
import NameEditor from '../NameEditor';

export const webServiceEventEditors = new Map<EventEditorType.Webservice, ReactNode>([
  ['WebserviceStart', <NameEditor icon={IvyIcons.WebService} />],
  ['WebserviceEnd', <NameEditor icon={IvyIcons.WebService} />]
]);
