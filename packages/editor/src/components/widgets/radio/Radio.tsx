import type { RadioGroupProps } from '@radix-ui/react-radio-group';
import { RadioGroup, RadioGroupItem, Label, Flex } from '@axonivy/ui-components';

export type RadioItemProps<T> = { value: T; label: string; description?: string };

type RadioProps<T extends string> = Omit<RadioGroupProps, 'value' | 'onChange'> & {
  value: T;
  onChange: (change: T) => void;
  items: RadioItemProps<T>[];
};

const Radio = <T extends string>({ value, onChange, items, orientation = 'vertical', ...props }: RadioProps<T>) => {
  return (
    <RadioGroup className='radio-group-root' value={value} onValueChange={onChange} orientation={orientation} {...props}>
      {items.map((item, index) => (
        <RadioItem key={`${index}-${item.value}`} {...item} />
      ))}
    </RadioGroup>
  );
};

const RadioItem = <T extends string>({ label, value, description }: RadioItemProps<T>) => {
  return (
    <Flex alignItems='center' gap={2}>
      <RadioGroupItem className='radio-group-item' value={value} />
      <Label className='radio-group-label' aria-label={label}>
        {label}
        <i>{description ? ` : ${description}` : ''}</i>
      </Label>
    </Flex>
  );
};

export default Radio;
