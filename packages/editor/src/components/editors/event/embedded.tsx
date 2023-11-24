/* eslint-disable react/jsx-key */
import { IvyIcons } from '@axonivy/editor-icons';
import type { ElementType } from '@axonivy/inscription-protocol';
import type { ReactNode } from 'react';
import NameEditor from '../NameEditor.js';

export const embeddedEventEditors = new Map<ElementType, ReactNode>([
  ['EmbeddedStart', <NameEditor icon={IvyIcons.Start} />],
  ['EmbeddedEnd', <NameEditor icon={IvyIcons.ProcessEnd} />]
]);
