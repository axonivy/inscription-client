import type { ReactNode } from 'react';
import { PathContext } from '../../../../context/index.js';
import type { CollapsibleProps } from '../../../widgets/collapsible/Collapsible.js';
import type { SchemaKeys } from '@axonivy/inscription-protocol';
import { ValidationCollapsible } from './validation/ValidationCollapsible.js';

export type PathCollapsibleProps = CollapsibleProps & {
  path: SchemaKeys;
  children: ReactNode;
};

export const PathCollapsible = ({ path: location, children, ...props }: PathCollapsibleProps) => (
  <PathContext path={location}>
    <ValidationCollapsible {...props}>{children}</ValidationCollapsible>
  </PathContext>
);
