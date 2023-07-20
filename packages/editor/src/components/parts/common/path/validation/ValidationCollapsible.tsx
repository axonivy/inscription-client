import Collapsible, { CollapsibleProps } from '../../../../widgets/collapsible/Collapsible';
import { useValidations } from '../../../../../context';

export const ValidationCollapsible = ({ children, ...props }: CollapsibleProps) => {
  const validation = useValidations().shift();
  return (
    <Collapsible {...props} message={validation}>
      {children}
    </Collapsible>
  );
};
