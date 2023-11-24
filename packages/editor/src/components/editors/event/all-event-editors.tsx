import type { ElementType } from '@axonivy/inscription-protocol';
import type { ReactNode } from 'react';
import { boundaryEventEditors } from './boundary.js';
import { callSubEventEditors } from './call-sub.js';
import { embeddedEventEditors } from './embedded.js';
import { endEventEditors } from './end.js';
import { htmlDialogEventEditors } from './html-dialog.js';
import { intermediateEventEditors } from './intermediate.js';
import { startEventEditors } from './start.js';
import { webServiceEventEditors } from './webservice.js';

export const eventEditors = new Map<ElementType, ReactNode>([
  ...startEventEditors,
  ...intermediateEventEditors,
  ...endEventEditors,
  ...boundaryEventEditors,
  ...webServiceEventEditors,
  ...callSubEventEditors,
  ...embeddedEventEditors,
  ...htmlDialogEventEditors
]);
