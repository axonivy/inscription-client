import { useCombobox } from 'downshift';
import { memo, ReactNode, useEffect, useState } from 'react';
import './Combobox.css';
import { Message } from '../../props/message';
import { useReadonly } from '../../../context';
import { IvyIcons } from '@axonivy/editor-icons';
import IvyIcon from '../IvyIcon';
import { Fieldset } from '../fieldset';

export interface ComboboxItem {
  value: string;
}

const Combobox = (props: {
  label: string;
  items: ComboboxItem[];
  itemFilter?: (item: ComboboxItem, input?: string) => boolean;
  comboboxItem: (item: ComboboxItem) => ReactNode;
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

  const readonly = useReadonly();

  return (
    <div className='combobox'>
      <Fieldset label={props.label} {...getLabelProps()} message={props.message}>
        <div className='combobox-input'>
          <input id='input' placeholder={`Select ${props.label}`} className='input' {...getInputProps()} disabled={readonly} />
          <button aria-label='toggle menu' className='combobox-button button' {...getToggleButtonProps()} disabled={readonly}>
            <IvyIcon icon={IvyIcons.AngleDown} />
          </button>
        </div>
      </Fieldset>
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
