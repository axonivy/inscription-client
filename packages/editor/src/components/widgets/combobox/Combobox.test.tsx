import type { ReactNode } from 'react';
import type { ComboboxItem } from './Combobox.js';
import Combobox from './Combobox.js';
import { render, screen, userEvent } from 'test-utils';
import type { BrowserType } from '../../../components/browser/index.js';

describe('Combobox', () => {
  function renderCombobox(
    value: string,
    options: {
      itemFilter?: (item: ComboboxItem, input?: string) => boolean;
      comboboxItem?: (item: ComboboxItem) => ReactNode;
      onChange?: (change: string) => void;
      macro?: boolean;
      browserTypes?: BrowserType[];
    } = {}
  ) {
    const items: ComboboxItem[] = [{ value: 'test' }, { value: 'bla' }];
    render(
      <Combobox
        items={items}
        itemFilter={options.itemFilter}
        comboboxItem={options.comboboxItem}
        value={value}
        onChange={options.onChange ? options.onChange : () => {}}
      />
    );
  }

  function assertMenuContent(expectedItems?: string[]) {
    const menu = screen.getByRole('listbox');
    if (expectedItems) {
      expect(menu).not.toBeEmptyDOMElement();
      const items = screen.getAllByRole('option');
      expect(items).toHaveLength(expectedItems.length);
      items.forEach((item, index) => {
        expect(item).toHaveTextContent(expectedItems[index]);
      });
    } else {
      expect(menu).toBeEmptyDOMElement();
    }
  }

  test('combobox will render', async () => {
    renderCombobox('test');
    const combobox = screen.getByRole('combobox');
    expect(combobox).toHaveValue('test');
    const button = screen.getByRole('button', { name: 'toggle menu' });
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  test('combobox will open on button click', async () => {
    renderCombobox('test');
    assertMenuContent();
    const button = screen.getByRole('button', { name: 'toggle menu' });
    await userEvent.default.click(button);
    assertMenuContent(['test', 'bla']);
  });

  test('combobox will render custom items', async () => {
    renderCombobox('test', { comboboxItem: item => <span>+ {item.value}</span> });
    assertMenuContent();
    const button = screen.getByRole('button', { name: 'toggle menu' });
    await userEvent.default.click(button);
    assertMenuContent(['+ test', '+ bla']);
  });

  test('combobox will update on item select', async () => {
    let data = 'test';
    renderCombobox(data, { onChange: (change: string) => (data = change) });
    const button = screen.getByRole('button', { name: 'toggle menu' });
    await userEvent.default.click(button);
    const item = screen.getByRole('option', { name: 'bla' });
    await userEvent.default.click(item);
    assertMenuContent();
    const combobox = screen.getByRole('combobox');
    expect(combobox).toHaveValue('bla');
    expect(data).toEqual('bla');
  });

  test('combobox will not update on invalid input', async () => {
    let data = 'test';
    renderCombobox(data, { onChange: (change: string) => (data = change) });
    const combobox = screen.getByRole('combobox');
    await userEvent.default.type(combobox, '123');
    expect(combobox).toHaveValue('test123');
    expect(data).toEqual('test');
  });

  test('combobox will update on input change', async () => {
    let data = 'test';
    renderCombobox(data, { onChange: (change: string) => (data = change) });
    const combobox = screen.getByRole('combobox');
    await userEvent.default.clear(combobox);
    await userEvent.default.type(combobox, 'la');
    await userEvent.default.keyboard('[ArrowDown]');
    const item = screen.getByRole('option', { name: 'bla' });
    expect(item).toHaveClass('hover');
    await userEvent.default.keyboard('[Enter]');
    expect(data).toEqual('bla');
  });

  test('combobox will use custom filter', async () => {
    const itemFilter = (item: ComboboxItem, input?: string) => {
      if (!input) {
        return true;
      }
      return item.value.startsWith(input);
    };
    renderCombobox('test', { itemFilter: itemFilter });
    const combobox = screen.getByRole('combobox');
    await userEvent.default.clear(combobox);
    await userEvent.default.type(combobox, 'la');
    assertMenuContent();
    await userEvent.default.clear(combobox);
    await userEvent.default.type(combobox, 'b');
    assertMenuContent(['bla']);
  });

  test('combobox support readonly mode', async () => {
    render(<Combobox items={[{ value: 'test' }]} value={'test'} onChange={() => {}} />, {
      wrapperProps: { editor: { readonly: true } }
    });

    expect(screen.getByRole('combobox')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'toggle menu' })).toBeDisabled();
  });
});
