import { useCombobox } from 'downshift';
import { memo, useEffect, useState } from 'react';
import { ComboboxItem } from '../../props/combobox';
import '../../../../style/Combobox.css';
import { Message } from '../../props/message';
import LabelInput from '../label/LabelInput';

const Combobox = (props: {
  label: string;
  items: ComboboxItem[];
  itemFilter?: (item: ComboboxItem, input?: string) => boolean;
  comboboxItem: (item: ComboboxItem) => JSX.Element;
  value: string;
  onChange: (change: string) => void;
  message?: Message;
}) => {
  const itemFilter = props.itemFilter
    ? props.itemFilter
    : (item: ComboboxItem, input?: string) => {
        if (!input) {
          return true;
        }
        var filter = input.toLowerCase();
        return item.value.toLowerCase().includes(filter);
      };

  const [items, setItems] = useState(props.items);
  useEffect(() => setItems(props.items), [props.items]);
  const { isOpen, getToggleButtonProps, getLabelProps, getMenuProps, getInputProps, highlightedIndex, getItemProps, selectedItem } =
    useCombobox({
      onSelectedItemChange(change) {
        setItems(props.items);
        props.onChange(change.inputValue ?? '');
      },
      onInputValueChange(change) {
        if (change.type !== '__item_click__') {
          setItems(props.items.filter(item => itemFilter(item, change.inputValue)));
        }
      },
      items,
      itemToString(item) {
        return item?.value ?? '';
      },
      initialSelectedItem: { value: props.value }
    });

  return (
    <div className='combobox'>
      <LabelInput label={props.label} htmlFor='input' {...getLabelProps()} message={props.message}>
        <div className='combobox-input'>
          <input id='input' placeholder={`Select ${props.label}`} className='input' {...getInputProps()} />
          <button aria-label='toggle menu' className='combobox-button' type='button' {...getToggleButtonProps()}>
            {isOpen ? <>&#8593;</> : <>&#8595;</>}
          </button>
        </div>
      </LabelInput>
      <ul {...getMenuProps()} className='combobox-menu'>
        {isOpen &&
          items.map((item, index) => (
            <li
              className={`combobox-menu-entry ${highlightedIndex === index ? 'hover' : ''} ${
                selectedItem?.value === item.value ? 'selected' : ''
              }`}
              key={`${item.value}${index}`}
              {...getItemProps({ item, index })}
            >
              {props.comboboxItem(item)}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default memo(Combobox);
