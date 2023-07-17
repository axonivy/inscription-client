import { ReactNode } from 'react';
import { PathContext } from '../../../../context';
import Collapsible, { CollapsibleProps } from '../../../widgets/collapsible/Collapsible';
import { SchemaKeys } from '@axonivy/inscription-protocol';

type PathCollapsibleProps = CollapsibleProps & {
  path: SchemaKeys;
  children: ReactNode;
};

export const PathCollapsible = ({ path: location, children, ...props }: PathCollapsibleProps) => (
  <PathContext path={location}>
    <Collapsible {...props}>{children}</Collapsible>
  </PathContext>
);
