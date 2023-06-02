import { useCombobox } from 'downshift';
import { ComponentProps, memo, ReactNode, useEffect, useState } from 'react';
import './Combobox.css';
import { useReadonly } from '../../../context';
import { IvyIcons } from '@axonivy/editor-icons';
import IvyIcon from '../IvyIcon';

export interface ComboboxItem {
  value: string;
}

export type ComboboxProps = Omit<ComponentProps<'input'>, 'value' | 'onChange'> & {
  items: ComboboxItem[];
  itemFilter?: (item: ComboboxItem, input?: string) => boolean;
  comboboxItem: (item: ComboboxItem) => ReactNode;
  value: string;
  onChange: (change: string) => void;
};

const Combobox = ({ items, itemFilter, comboboxItem, value, onChange, ...inputProps }: ComboboxProps) => {
  const filter = itemFilter
    ? itemFilter
    : (item: ComboboxItem, input?: string) => {
        if (!input) {
          return true;
        }
        var filter = input.toLowerCase();
        return item.value.toLowerCase().includes(filter);
      };

  const [filteredItems, setFilteredItems] = useState(items);
  useEffect(() => setFilteredItems(items), [items]);
  const { isOpen, getToggleButtonProps, getMenuProps, getInputProps, highlightedIndex, getItemProps, selectedItem } = useCombobox({
    onSelectedItemChange(change) {
      setFilteredItems(items);
      onChange(change.inputValue ?? '');
    },
    onInputValueChange(change) {
      if (change.type !== '__item_click__') {
        setFilteredItems(items.filter(item => filter(item, change.inputValue)));
      }
    },
    items: filteredItems,
    itemToString(item) {
      return item?.value ?? '';
    },
    initialSelectedItem: { value }
  });

  const readonly = useReadonly();

  return (
    <div className='combobox'>
      <div className='combobox-input'>
        <input className='input' {...getInputProps()} {...inputProps} disabled={readonly} />
        <button aria-label='toggle menu' className='combobox-button button' {...getToggleButtonProps()} disabled={readonly}>
          <IvyIcon icon={IvyIcons.AngleDown} />
        </button>
      </div>
      <ul {...getMenuProps()} className='combobox-menu'>
        {isOpen &&
          filteredItems.map((item, index) => (
            <li
              className={`combobox-menu-entry ${highlightedIndex === index ? 'hover' : ''} ${
                selectedItem?.value === item.value ? 'selected' : ''
              }`}
              key={`${item.value}${index}`}
              {...getItemProps({ item, index })}
            >
              {comboboxItem(item)}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default memo(Combobox);
