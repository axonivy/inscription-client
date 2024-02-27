import { Checkbox as CheckboxPromitive, Flex, Label } from '@axonivy/ui-components';
import { useReadonly } from '../../../context';
import { useFieldset } from '../fieldset';

type CheckboxProps = { label: string; value: boolean; onChange: (change: boolean) => void; disabled?: boolean };

const Checkbox = ({ label, value, onChange, disabled }: CheckboxProps) => {
  const readonly = useReadonly();
  const fieldset = useFieldset();
  return (
    <Flex alignItems='center' gap={1}>
      <CheckboxPromitive checked={value} onCheckedChange={onChange} disabled={readonly || disabled} {...fieldset.inputProps} />
      <Label {...fieldset.labelProps}>{label}</Label>
    </Flex>
  );
};

export default Checkbox;
