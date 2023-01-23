import { EventEditorType } from '@axonivy/inscription-protocol';
import { ReactNode } from 'react';
import { callSubEventEditors } from './call-sub';
import { embeddedEventEditors } from './embedded';
import { endEventEditors } from './end';
import { htmlDialogEventEditors } from './html-dialog';
import { intermediateEventEditors } from './intermediate';
import { startEventEditors } from './start';
import { webServiceEventEditors } from './webservice';

export const eventEditors = new Map<EventEditorType.All, ReactNode>([
  ...startEventEditors,
  ...intermediateEventEditors,
  ...endEventEditors,
  ...webServiceEventEditors,
  ...callSubEventEditors,
  ...embeddedEventEditors,
  ...htmlDialogEventEditors
]);
