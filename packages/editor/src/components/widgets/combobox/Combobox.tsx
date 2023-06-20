import { useCombobox } from 'downshift';
import { ComponentProps, memo, ReactNode, useEffect, useState } from 'react';
import './Combobox.css';
import { useReadonly } from '../../../context';
import { IvyIcons } from '@axonivy/editor-icons';
import Button from '../button/Button';

export interface ComboboxItem {
  value: string;
}

export type ComboboxProps<T extends ComboboxItem> = Omit<ComponentProps<'input'>, 'value' | 'onChange'> & {
  items: T[];
  itemFilter?: (item: T, input?: string) => boolean;
  comboboxItem: (item: T) => ReactNode;
  value: string;
  onChange: (change: string) => void;
};

const Combobox = <T extends ComboboxItem>({ items, itemFilter, comboboxItem, value, onChange, ...inputProps }: ComboboxProps<T>) => {
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

  const { isOpen, getToggleButtonProps, getMenuProps, getInputProps, highlightedIndex, getItemProps, selectedItem, selectItem } =
    useCombobox({
      onSelectedItemChange(change) {
        setFilteredItems(items);
        onChange(change.inputValue ?? '');
      },
      stateReducer(state, actionAndChanges) {
        switch (actionAndChanges.type) {
          case useCombobox.stateChangeTypes.InputBlur:
          case useCombobox.stateChangeTypes.InputKeyDownEnter:
            selectItem({ value: actionAndChanges.changes.inputValue ?? '' });
        }
        return actionAndChanges.changes;
      },
      onInputValueChange(change) {
        if (change.type !== useCombobox.stateChangeTypes.FunctionSelectItem) {
          setFilteredItems(items.filter(item => filter(item, change.inputValue)));
        }
      },
      items: filteredItems,
      itemToString(item) {
        return item?.value ?? '';
      },
      initialSelectedItem: { value }
    });

  useEffect(() => {
    selectItem({ value });
    setFilteredItems(items);
  }, [items, selectItem, value]);

  const readonly = useReadonly();

  return (
    <div className='combobox'>
      <div className='combobox-input'>
        <input className='input' {...getInputProps()} {...inputProps} disabled={readonly} />
        <Button
          className='combobox-button'
          icon={IvyIcons.AngleDown}
          aria-label='toggle menu'
          {...getToggleButtonProps()}
          disabled={readonly}
        />
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

export default memo(Combobox) as typeof Combobox;
