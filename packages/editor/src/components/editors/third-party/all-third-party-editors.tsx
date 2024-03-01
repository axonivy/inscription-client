import type { ElementType } from '@axonivy/inscription-protocol';
import { thirdPartyInterfaceActivityEditors } from './interface';
import type { ReactNode } from 'react';
import { thirdPartyStartEventEditors } from './start';
import { thirdPartyIntermediateEventEditors } from './intermediate';

export const thirdPartyEditors = new Map<ElementType, ReactNode>([
  ...thirdPartyInterfaceActivityEditors,
  ...thirdPartyStartEventEditors,
  ...thirdPartyIntermediateEventEditors
]);
