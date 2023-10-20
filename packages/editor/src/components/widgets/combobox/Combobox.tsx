import { useCombobox } from 'downshift';
import { ComponentProps, memo, ReactNode, useEffect, useState } from 'react';
import './Combobox.css';
import { usePath, useReadonly } from '../../../context';
import { IvyIcons } from '@axonivy/editor-icons';
import Button from '../button/Button';
import { SingleLineCodeEditor } from '../code-editor';
import { useModifyEditor } from '../code-editor/useCodeEditor';
import { Browser, BrowserType, useBrowser } from '../../../components/browser';
import { CardText } from '../output/CardText';
import { useOnFocus } from '../../../components/browser/useOnFocus';

export interface ComboboxItem {
  value: string;
}

export type ComboboxProps<T extends ComboboxItem> = Omit<ComponentProps<'input'>, 'value' | 'onChange'> & {
  items: T[];
  itemFilter?: (item: T, input?: string) => boolean;
  comboboxItem?: (item: T) => ReactNode;
  value: string;
  onChange: (change: string) => void;
  macro?: boolean;
  browserTypes?: BrowserType[];
};

const Combobox = <T extends ComboboxItem>({
  items,
  itemFilter,
  comboboxItem,
  value,
  onChange,
  macro,
  browserTypes,
  ...inputProps
}: ComboboxProps<T>) => {
  const filter = itemFilter
    ? itemFilter
    : (item: ComboboxItem, input?: string) => {
        if (!input) {
          return true;
        }
        const filter = input.toLowerCase();
        return item.value.toLowerCase().includes(filter);
      };
  const option = comboboxItem ? comboboxItem : (item: ComboboxItem) => <span>{item.value}</span>;

  const [filteredItems, setFilteredItems] = useState(items);
  useEffect(() => setFilteredItems(items), [items]);

  const { isOpen, getToggleButtonProps, getMenuProps, getInputProps, highlightedIndex, getItemProps, selectedItem, selectItem } =
    useCombobox({
      onSelectedItemChange(change) {
        setFilteredItems(items);
        if (change.inputValue !== value) {
          onChange(change.inputValue ?? '');
        }
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
  const { setEditor, modifyEditor } = useModifyEditor(value => `<%=${value}%>`);
  const path = usePath();
  const browser = useBrowser();
  const { isFocusWithin, focusValue, focusWithinProps } = useOnFocus(value, onChange);

  return (
    <div className='combobox'>
      <div className='combobox-input' {...(macro ? { ...focusWithinProps, tabIndex: 1 } : {})}>
        {macro ? (
          isFocusWithin || browser.open ? (
            <SingleLineCodeEditor
              {...focusValue}
              value={value}
              onChange={onChange}
              context={{ location: path }}
              macro={true}
              onMountFuncs={[setEditor]}
            />
          ) : (
            <CardText value={value} {...inputProps} />
          )
        ) : (
          <input className='input' {...getInputProps()} {...inputProps} disabled={readonly} />
        )}
        <Button
          className='combobox-button'
          icon={IvyIcons.AngleDown}
          aria-label='toggle menu'
          {...getToggleButtonProps()}
          disabled={readonly}
        />
        {browserTypes || (macro && browserTypes!) ? (
          <Browser {...browser} types={browserTypes ? browserTypes : ['attr']} accept={macro ? modifyEditor : onChange} location={path} />
        ) : null}
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
              {option(item)}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default memo(Combobox) as typeof Combobox;
