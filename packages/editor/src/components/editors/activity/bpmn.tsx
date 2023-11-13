/* eslint-disable react/jsx-key */
import { IvyIcons } from '@axonivy/editor-icons';
import type { ElementType } from '@axonivy/inscription-protocol';
import type { ReactNode } from 'react';
import NameEditor from '../NameEditor';

export const bpmnActivityEditors = new Map<ElementType, ReactNode>([
  ['GenericBpmnElement', <NameEditor icon={IvyIcons.Sub} hideTags={true} />],
  ['UserBpmnElement', <NameEditor icon={IvyIcons.User} hideTags={true} />],
  ['ManualBpmnElement', <NameEditor icon={IvyIcons.Manual} hideTags={true} />],
  ['ScriptBpmnElement', <NameEditor icon={IvyIcons.Script} hideTags={true} />],
  ['ServiceBpmnElement', <NameEditor icon={IvyIcons.Service} hideTags={true} />],
  ['RuleBpmnElement', <NameEditor icon={IvyIcons.Rule} hideTags={true} />],
  ['SendBpmnElement', <NameEditor icon={IvyIcons.Send} hideTags={true} />],
  ['ReceiveBpmnElement', <NameEditor icon={IvyIcons.Receive} hideTags={true} />]
]);
