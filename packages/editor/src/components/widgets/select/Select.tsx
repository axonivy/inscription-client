import { Select as SelectRoot, SelectTrigger, SelectValue, SelectGroup, SelectContent, SelectItem } from '@axonivy/ui-components';
import { memo } from 'react';
import { useReadonly } from '../../../context';

export type SelectItem = {
  label: string;
  value: string;
};

export const EMPTY_SELECT_ITEM: SelectItem = { label: '', value: '' };

export type SelectInputProps = { id: string; 'aria-labelledby': string };

export type SelectProps = {
  value?: SelectItem;
  onChange: (value: SelectItem) => void;
  items: SelectItem[];
  inputProps?: SelectInputProps;
  disabled?: boolean;
};

const Select = ({ value, onChange, items, inputProps, disabled }: SelectProps) => {
  const readonly = useReadonly();

  const onValueChange = (change: string) => {
    const item = items.find(({ value }) => value === change);
    onChange(item ?? EMPTY_SELECT_ITEM);
  };

  return (
    <SelectRoot value={value?.value} onValueChange={onValueChange} disabled={readonly || disabled} {...inputProps}>
      <SelectTrigger>
        <SelectValue placeholder='Select a fruit' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item, index) => (
            <SelectItem key={`${item.value}${index}`} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectRoot>
  );
};

export default memo(Select);
