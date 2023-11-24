import type { ElementType } from '@axonivy/inscription-protocol';
import { workflowActivityEditors } from './workflow.js';
import { bpmnActivityEditors } from './bpmn.js';
import { interfaceActivityEditors } from './interface.js';
import type { ReactNode } from 'react';

export const activityEditors = new Map<ElementType, ReactNode>([
  ...workflowActivityEditors,
  ...interfaceActivityEditors,
  ...bpmnActivityEditors
]);
