import type { SelectItem } from './Select';
import Select from './Select';
import { render, screen, userEvent } from 'test-utils';
import { describe, test, expect } from 'vitest';

describe('Select', () => {
  const items: SelectItem[] = [
    { label: 'label', value: 'value' },
    { label: 'test', value: 'bla' }
  ];

  function renderSelect(): {
    data: () => SelectItem;
    rerender: () => void;
  } {
    let value = items[0];
    userEvent.setup();
    const view = render(<Select items={items} value={items[0]} onChange={(change: SelectItem) => (value = change)} />);
    return {
      data: () => value,
      rerender: () => view.rerender(<Select items={items} value={value} onChange={(change: SelectItem) => (value = change)} />)
    };
  }

  test('select will render', async () => {
    renderSelect();
    const select = screen.getByRole('combobox');
    const selectMenu = screen.getByRole('listbox');
    expect(select).toHaveTextContent('label');
    expect(selectMenu).toBeEmptyDOMElement();

    await userEvent.click(select);
    expect(select).toHaveTextContent('label');
    expect(selectMenu).not.toBeEmptyDOMElement();
    expect(screen.getAllByRole('option')).toHaveLength(2);
    expect(screen.getByRole('option', { name: 'label' })).toHaveClass('hover', 'selected');
    expect(screen.getByRole('option', { name: 'test' })).not.toHaveClass('hover', 'selected');

    await userEvent.click(select);
    expect(select).toHaveTextContent('label');
    expect(selectMenu).toBeEmptyDOMElement();
  });

  test('select can change value', async () => {
    const view = renderSelect();
    const select = screen.getByRole('combobox');
    const selectMenu = screen.getByRole('listbox');
    expect(select).toHaveTextContent(/label/);
    expect(view.data().value).toEqual('value');

    await userEvent.click(select);
    expect(screen.getAllByRole('option')).toHaveLength(2);
    await userEvent.click(screen.getByRole('option', { name: 'test' }));
    expect(selectMenu).toBeEmptyDOMElement();
    view.rerender();
    expect(select).toHaveTextContent(/test/);
    expect(view.data().value).toEqual('bla');
  });

  test('select can be handled with keyboard', async () => {
    const view = renderSelect();
    const select = screen.getByRole('combobox');
    const selectMenu = screen.getByRole('listbox');
    await userEvent.keyboard('[Tab]');
    expect(select).toHaveFocus();
    expect(selectMenu).toBeEmptyDOMElement();

    await userEvent.keyboard('[Enter]');
    expect(selectMenu).not.toBeEmptyDOMElement();
    await userEvent.keyboard('[Enter]');
    expect(selectMenu).toBeEmptyDOMElement();
    await userEvent.keyboard('[Space]');
    expect(selectMenu).not.toBeEmptyDOMElement();

    const option1 = screen.getByRole('option', { name: 'label' });
    const option2 = screen.getByRole('option', { name: 'test' });
    expect(option1).toHaveClass('hover', 'selected');
    expect(option2).not.toHaveClass('hover', 'selected');
    await userEvent.keyboard('[ArrowDown]');
    expect(option1).toHaveClass('selected');
    expect(option1).not.toHaveClass('hover');
    expect(option2).toHaveClass('hover');
    expect(option2).not.toHaveClass('selected');

    await userEvent.keyboard('[Enter]');
    expect(selectMenu).toBeEmptyDOMElement();
    view.rerender();
    expect(select).toHaveTextContent(/test/);
    expect(view.data().value).toEqual('bla');
  });

  test('select support readonly mode', () => {
    render(<Select items={items} value={items[0]} onChange={() => {}} disabled={true} />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  test('select support readonly mode', () => {
    render(<Select items={items} value={items[0]} onChange={() => {}} />, {
      wrapperProps: { editor: { readonly: true } }
    });
    expect(screen.getByRole('combobox')).toBeDisabled();
  });
});
