import Fieldset, { FieldsetProps } from '../../../../widgets/fieldset/Fieldset';
import { useValidation } from '../../../../../context';

export const ValidationFieldset = ({ children, ...props }: FieldsetProps) => {
  const validation = useValidation();
  return (
    <Fieldset {...props} message={validation}>
      {children}
    </Fieldset>
  );
};
