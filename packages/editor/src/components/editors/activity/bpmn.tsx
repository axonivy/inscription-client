import { IvyIcons } from '@axonivy/editor-icons';
import { ActivityEditorType } from '@axonivy/inscription-protocol';
import { ReactNode } from 'react';
import NameEditor from '../NameEditor';

export const bpmnActivityEditors = new Map<ActivityEditorType.Bpmn, ReactNode>([
  ['GenericBpmnElement', <NameEditor icon={IvyIcons.Sub} />],
  ['UserBpmnElement', <NameEditor icon={IvyIcons.User} />],
  ['ManualBpmnElement', <NameEditor icon={IvyIcons.Manual} />],
  ['ScriptBpmnElement', <NameEditor icon={IvyIcons.Script} />],
  ['ServiceBpmnElement', <NameEditor icon={IvyIcons.Service} />],
  ['RuleBpmnElement', <NameEditor icon={IvyIcons.Rule} />],
  ['SendBpmnElement', <NameEditor icon={IvyIcons.Send} />],
  ['ReceiveBpmnElement', <NameEditor icon={IvyIcons.Receive} />]
]);
