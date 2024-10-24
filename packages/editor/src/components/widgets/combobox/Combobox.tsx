import { useCombobox } from 'downshift';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { memo, useEffect, useState } from 'react';
import './Combobox.css';
import { usePath } from '../../../context';
import { IvyIcons } from '@axonivy/ui-icons';
import { Button, Input, InputBadge, useField, useReadonly } from '@axonivy/ui-components';
import { SingleLineCodeEditor } from '../code-editor';
import { useMonacoEditor } from '../code-editor/useCodeEditor';
import type { BrowserType } from '../../../components/browser';
import { Browser, useBrowser } from '../../../components/browser';
import { useOnFocus } from '../../../components/browser/useOnFocus';
import type { BrowserValue } from '../../browser/Browser';
import { badgePropsExpression } from '../../../utils/badgeproperties';

export interface ComboboxItem {
  value: string;
}

export type ComboboxProps<T extends ComboboxItem> = Omit<ComponentPropsWithRef<'input'>, 'value' | 'onChange'> & {
  items: T[];
  itemFilter?: (item: T, input?: string) => boolean;
  comboboxItem?: (item: T) => ReactNode;
  value: string;
  onChange: (change: string) => void;
  macro?: boolean;
  browserTypes?: BrowserType[];
  updateOnInputChange?: boolean;
};

const Combobox = <T extends ComboboxItem>({
  items,
  itemFilter,
  comboboxItem,
  value,
  onChange,
  macro,
  browserTypes,
  updateOnInputChange,
  ...props
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
          if (updateOnInputChange) {
            onChange(change.inputValue ?? '');
          }
        }
      },
      items: filteredItems,
      itemToString(item) {
        return item?.value ?? '';
      },
      initialSelectedItem: { value }
    });

  useEffect(() => {
    if (!updateOnInputChange || updateOnInputChange == undefined) {
      selectItem({ value });
      setFilteredItems(items);
    }
  }, [updateOnInputChange, items, selectItem, value]);

  const readonly = useReadonly();
  const { setEditor, modifyEditor } = useMonacoEditor({ modifyAction: value => `<%=${value}%>` });
  const path = usePath();
  const browser = useBrowser();
  const { isFocusWithin, focusValue, focusWithinProps } = useOnFocus(value, onChange);

  const { inputProps } = useField();

  return (
    <div className='combobox'>
      <div className='combobox-input' {...(macro ? { ...focusWithinProps, tabIndex: 1 } : {})}>
        {macro ? (
          isFocusWithin || browser.open ? (
            <>
              <SingleLineCodeEditor
                {...focusValue}
                value={value}
                onChange={onChange}
                context={{ location: path }}
                macro={true}
                onMountFuncs={[setEditor]}
              />
              {browserTypes || (macro && browserTypes!) ? (
                <Browser
                  {...browser}
                  types={browserTypes ? browserTypes : ['attr']}
                  accept={macro ? modifyEditor : (change: BrowserValue) => onChange(change.cursorValue)}
                  location={path}
                />
              ) : null}
            </>
          ) : (
            <div className='input-badge-wrapper'>
              <InputBadge badgeProps={badgePropsExpression} value={value} {...inputProps} />
            </div>
          )
        ) : (
          <Input {...getInputProps()} {...inputProps} {...props} />
        )}
        <Button {...getToggleButtonProps()} icon={IvyIcons.Chevron} aria-label='toggle menu' disabled={readonly} />
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
