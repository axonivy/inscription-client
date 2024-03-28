import { Checkbox as CheckboxPromitive, Field, Label } from '@axonivy/ui-components';

type CheckboxProps = { label: string; value: boolean; onChange: (change: boolean) => void; disabled?: boolean };

const Checkbox = ({ label, value, onChange, disabled }: CheckboxProps) => (
  <Field direction='row' alignItems='center' gap={2}>
    <CheckboxPromitive checked={value} onCheckedChange={onChange} disabled={disabled} />
    <Label>{label}</Label>
  </Field>
);

export default Checkbox;
