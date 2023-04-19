import { IvyIcons } from '@axonivy/editor-icons';
import { ReactNode } from 'react';
import NameEditor from '../NameEditor';
import { ElementType } from '@axonivy/inscription-protocol';

export const callSubEventEditors = new Map<ElementType, ReactNode>([
  ['CallSubStart', <NameEditor icon={IvyIcons.SubStart} />],
  ['CallSubEnd', <NameEditor icon={IvyIcons.SubEnd} />]
]);
