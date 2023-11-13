import type { ElementType } from '@axonivy/inscription-protocol';
import { workflowActivityEditors } from './workflow';
import { bpmnActivityEditors } from './bpmn';
import { interfaceActivityEditors } from './interface';
import type { ReactNode } from 'react';

export const activityEditors = new Map<ElementType, ReactNode>([
  ...workflowActivityEditors,
  ...interfaceActivityEditors,
  ...bpmnActivityEditors
]);
