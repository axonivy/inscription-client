/* eslint-disable react/jsx-key */
import { ElementType } from '@axonivy/inscription-protocol';
import { ReactNode } from 'react';
import NameEditor from './NameEditor';
import { IvyIcons } from '@axonivy/editor-icons';

export const otherEditors = new Map<ElementType, ReactNode>([['ProcessAnnotation', <NameEditor icon={IvyIcons.Note} hideTags={true} />]]);
