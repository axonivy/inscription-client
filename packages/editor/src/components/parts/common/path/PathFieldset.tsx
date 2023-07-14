import { ReactNode } from 'react';
import { PathContext, useValidation } from '../../../../context';
import Fieldset, { FieldsetProps } from '../../../widgets/fieldset/Fieldset';
import { SchemaKeys } from '@axonivy/inscription-protocol';

type PathFieldsetProps = FieldsetProps & {
  path: SchemaKeys;
  children: ReactNode;
};

export const PathFieldset = ({ path: location, children, ...props }: PathFieldsetProps) => (
  <PathContext path={location}>
    <ValidationFieldset {...props}>{children}</ValidationFieldset>
  </PathContext>
);

export const ValidationFieldset = ({ children, ...props }: FieldsetProps) => {
  const validation = useValidation();
  return (
    <Fieldset {...props} message={validation}>
      {children}
    </Fieldset>
  );
};
