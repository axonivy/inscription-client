import { ReactNode } from 'react';
import { PathContext } from '../../../../context';
import CollapsiblePart, { CollapsiblePartProps } from '../../../widgets/collapsible/CollapsiblePart';
import { SchemaKeys } from '@axonivy/inscription-protocol';

type PathCollapsibleProps = CollapsiblePartProps & {
  path: SchemaKeys;
  children: ReactNode;
};

export const PathCollapsible = ({ path: location, children, ...props }: PathCollapsibleProps) => (
  <PathContext path={location}>
    <CollapsiblePart {...props}>{children}</CollapsiblePart>
  </PathContext>
);
