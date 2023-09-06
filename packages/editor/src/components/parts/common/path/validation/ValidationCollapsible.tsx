import Collapsible, { CollapsibleProps } from '../../../../widgets/collapsible/Collapsible';
import { useValidations } from '../../../../../context';
import { SchemaKeys } from '@axonivy/inscription-protocol';
import { useMemo } from 'react';

export const ValidationCollapsible = ({ paths, children, ...props }: CollapsibleProps & { paths?: SchemaKeys[] }) => {
  const validations = useValidations();
  const validation = useMemo(() => {
    if (paths) {
      for (const path of paths) {
        return validations.find(val => val.path.includes(path));
      }
    }
    return validations.shift();
  }, [paths, validations]);
  return (
    <Collapsible {...props} message={validation}>
      {children}
    </Collapsible>
  );
};
