import { useReadonly } from '../../../context';
import { useFieldset } from '../fieldset';
import './Radio.css';
import { RadioGroup, RadioGroupProps, RadioGroupItem, RadioGroupIndicator } from '@radix-ui/react-radio-group';

export type RadioItemProps<T> = { value: T; label: string; description?: string };

type RadioProps<T extends string> = Omit<RadioGroupProps, 'value' | 'onChange'> & {
  value: T;
  onChange: (change: T) => void;
  items: RadioItemProps<T>[];
};

const Radio = <T extends string>({ value, onChange, items, ...props }: RadioProps<T>) => {
  const readonly = useReadonly();
  return (
    <RadioGroup className='radio-group-root' value={value} onValueChange={onChange} disabled={readonly} {...props}>
      {items.map((item, index) => (
        <RadioItem key={`${index}-${item.value}`} {...item} />
      ))}
    </RadioGroup>
  );
};

const RadioItem = <T extends string>({ label, value, description }: RadioItemProps<T>) => {
  const fieldset = useFieldset();
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <RadioGroupItem className='radio-group-item' value={value} {...fieldset.inputProps}>
        <RadioGroupIndicator className='radio-group-indicator' />
      </RadioGroupItem>
      <label className='radio-group-label' aria-label={label} {...fieldset.labelProps}>
        {label}
        <i>{description ? ` : ${description}` : ''}</i>
      </label>
    </div>
  );
};

export default Radio;
