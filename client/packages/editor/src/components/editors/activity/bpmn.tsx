import { IvyIcons } from '@axonivy/editor-icons';
import { ActivityEditorType } from '@axonivy/inscription-core';
import NameEditor from '../NameEditor';

export const bpmnActivityEditors = new Map<ActivityEditorType.Bpmn, JSX.Element>([
  ['GenericBpmnElement', <NameEditor title='Generic BPMN Activity' icon={IvyIcons.Sub} />],
  ['UserBpmnElement', <NameEditor title='BPMN User Activity' icon={IvyIcons.User} />],
  ['ManualBpmnElement', <NameEditor title='BPMN Manual Activity' icon={IvyIcons.Manual} />],
  ['ScriptBpmnElement', <NameEditor title='BPMN Script Activity' icon={IvyIcons.Script} />],
  ['ServiceBpmnElement', <NameEditor title='BPMN Service Activity' icon={IvyIcons.Service} />],
  ['RuleBpmnElement', <NameEditor title='BPMN Rule Activity' icon={IvyIcons.Rule} />],
  ['SendBpmnElement', <NameEditor title='BPMN Send Activity' icon={IvyIcons.Send} />],
  ['ReceiveBpmnElement', <NameEditor title='BPMN Receive Activity' icon={IvyIcons.Receive} />]
]);
