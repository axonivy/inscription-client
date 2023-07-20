import { ReactNode } from 'react';
import { PathContext } from '../../../../context';
import { CollapsibleProps } from '../../../widgets/collapsible/Collapsible';
import { SchemaKeys } from '@axonivy/inscription-protocol';
import { ValidationCollapsible } from './validation/ValidationCollapsible';

type PathCollapsibleProps = CollapsibleProps & {
  path: SchemaKeys;
  children: ReactNode;
};

export const PathCollapsible = ({ path: location, children, ...props }: PathCollapsibleProps) => (
  <PathContext path={location}>
    <ValidationCollapsible {...props}>{children}</ValidationCollapsible>
  </PathContext>
);
