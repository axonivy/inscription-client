import './Select.css';
import { useSelect } from 'downshift';
import { memo, useEffect, useState } from 'react';
import { useReadonly } from '../../../context';
import { IvyIcons } from '@axonivy/editor-icons';
import IvyIcon from '../IvyIcon';

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
};

const Select = (props: SelectProps) => {
  const [items, setItems] = useState(props.items);
  useEffect(() => setItems(props.items), [props.items]);
  const [selectedItem, setSelectedItem] = useState(props.value ?? EMPTY_SELECT_ITEM);
  useEffect(() => setSelectedItem(props.value ?? EMPTY_SELECT_ITEM), [props.value]);

  const { isOpen, getToggleButtonProps, getMenuProps, highlightedIndex, getItemProps } = useSelect<SelectItem>({
    selectedItem: selectedItem,
    items: items,
    onSelectedItemChange: change => change.selectedItem && props.onChange(change.selectedItem)
  });
  const readonly = useReadonly();

  return (
    <div className='select'>
      <div className='select-input'>
        <button
          aria-label='toggle menu'
          className='select-button'
          type='button'
          {...getToggleButtonProps()}
          {...props.inputProps}
          disabled={readonly}
        >
          <span>{selectedItem ? selectedItem.label : ''}</span>
          <IvyIcon icon={IvyIcons.AngleDown} />
        </button>
      </div>
      <ul {...getMenuProps()} className='select-menu'>
        {isOpen &&
          props.items.map((item, index) => (
            <li
              className={`select-menu-entry ${highlightedIndex === index ? 'hover' : ''} ${
                selectedItem?.value === item.value ? 'selected' : ''
              }`}
              key={`${item.value}${index}`}
              {...getItemProps({ item, index })}
            >
              {item.label}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default memo(Select);
