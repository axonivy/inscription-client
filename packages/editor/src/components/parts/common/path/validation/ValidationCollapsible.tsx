import type { CollapsibleProps } from '../../../../widgets/collapsible/Collapsible';
import Collapsible from '../../../../widgets/collapsible/Collapsible';
import { useValidations } from '../../../../../context';
import type { SchemaKeys } from '@axonivy/inscription-protocol';
import { useMemo } from 'react';

export const ValidationCollapsible = ({ paths, children, ...props }: CollapsibleProps & { paths?: SchemaKeys[] }) => {
  const validations = useValidations();
  const pathValidations = useMemo(() => {
    if (paths) {
      for (const path of paths) {
        return validations.filter(val => val.path.includes(path));
      }
    }
    return validations;
  }, [paths, validations]);
  return (
    <Collapsible {...props} validations={pathValidations}>
      {children}
    </Collapsible>
  );
};
