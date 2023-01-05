import { ActivityEditorType } from '@axonivy/inscription-core';
import { workflowActivityEditors } from './workflow';
import { bpmnActivityEditors } from './bpmn';
import { interfaceActivityEditors } from './interface';

export const activityEditors = new Map<ActivityEditorType.All, JSX.Element>([
  ...workflowActivityEditors,
  ...interfaceActivityEditors,
  ...bpmnActivityEditors
]);
