import type { FieldsetProps } from '../../../../widgets/fieldset/Fieldset.js';
import Fieldset from '../../../../widgets/fieldset/Fieldset.js';
import { useValidation } from '../../../../../context/index.js';

export const ValidationFieldset = ({ children, ...props }: FieldsetProps) => {
  const validation = useValidation();
  return (
    <Fieldset {...props} message={validation}>
      {children}
    </Fieldset>
  );
};
