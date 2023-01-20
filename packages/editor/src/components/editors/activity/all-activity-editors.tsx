import { ActivityEditorType } from '@axonivy/inscription-protocol';
import { workflowActivityEditors } from './workflow';
import { bpmnActivityEditors } from './bpmn';
import { interfaceActivityEditors } from './interface';
import { ReactNode } from 'react';

export const activityEditors = new Map<ActivityEditorType.All, ReactNode>([
  ...workflowActivityEditors,
  ...interfaceActivityEditors,
  ...bpmnActivityEditors
]);
