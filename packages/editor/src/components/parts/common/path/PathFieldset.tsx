import type { ReactNode } from 'react';
import { PathContext } from '../../../../context';
import type { FieldsetProps } from '../../../widgets/fieldset/Fieldset';
import type { SchemaKeys } from '@axonivy/inscription-protocol';
import { ValidationFieldset } from './validation/ValidationFieldset';

export type PathFieldsetProps = FieldsetProps & {
  path: SchemaKeys;
  children: ReactNode;
};

export const PathFieldset = ({ path: location, children, ...props }: PathFieldsetProps) => (
  <PathContext path={location}>
    <ValidationFieldset {...props}>{children}</ValidationFieldset>
  </PathContext>
);
