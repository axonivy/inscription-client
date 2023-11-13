import type { ElementType } from '@axonivy/inscription-protocol';
import type { ReactNode } from 'react';
import { boundaryEventEditors } from './boundary';
import { callSubEventEditors } from './call-sub';
import { embeddedEventEditors } from './embedded';
import { endEventEditors } from './end';
import { htmlDialogEventEditors } from './html-dialog';
import { intermediateEventEditors } from './intermediate';
import { startEventEditors } from './start';
import { webServiceEventEditors } from './webservice';

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
