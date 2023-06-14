import { WfCustomField } from '@axonivy/inscription-protocol';
import CustomFieldTable from './CustomFieldTable';
import { render, screen, userEvent, TableUtil } from 'test-utils';

describe('CustomFieldTable', () => {
  const customFields: WfCustomField[] = [
    { name: 'field1', type: 'STRING', value: 'this is a string' },
    { name: 'number', type: 'NUMBER', value: '1' }
  ];
  function renderTable(): {
    data: () => WfCustomField[];
    rerender: () => void;
  } {
    let data: WfCustomField[] = customFields;
    const view = render(<CustomFieldTable data={data} onChange={change => (data = change)} />);
    return {
      data: () => data,
      // eslint-disable-next-line testing-library/no-unnecessary-act
      rerender: () => view.rerender(<CustomFieldTable data={data} onChange={change => (data = change)} />)
    };
  }

  test('table will render', () => {
    renderTable();
    TableUtil.assertHeaders(['Name', 'Type', 'Expression', '', '']);
    TableUtil.assertRows([/field1/, /number/]);
  });

  test('table can sort columns', async () => {
    renderTable();
    const columnHeader = screen.getByRole('button', { name: 'Sort by Name' });
    await userEvent.click(columnHeader);
    TableUtil.assertRows([/field1/, /number/]);

    await userEvent.click(columnHeader);
    TableUtil.assertRows([/number/, /field1/]);
  });

  test('table can add new row', async () => {
    const view = renderTable();
    await TableUtil.assertAddRow(view, 3);
  });

  test('table can remove a row', async () => {
    const view = renderTable();
    await TableUtil.assertRemoveRow(view, 1);
  });

  test('table can add/remove rows by keyboard', async () => {
    const view = renderTable();
    await TableUtil.assertAddAndRemoveWithKeyboard(view, 2);
  });

  test('table can edit cells', async () => {
    const view = renderTable();
    const field1 = screen.getByDisplayValue(/field1/);
    await userEvent.clear(field1);
    await userEvent.type(field1, 'Hello[Tab]');
    view.rerender();

    const type = screen.getAllByRole('combobox')[1];
    await userEvent.click(type);
    await userEvent.keyboard('[ArrowDown][Enter]');

    expect(view.data()).toEqual([
      { name: 'Hello', type: 'STRING', value: 'this is a string' },
      { name: 'number', type: 'STRING', value: '1' }
    ]);
  });

  test('table support readonly mode', async () => {
    render(<CustomFieldTable data={customFields} onChange={() => {}} />, { wrapperProps: { editor: { readonly: true } } });
    TableUtil.assertReadonly();
    expect(screen.getByDisplayValue(/field1/)).toBeDisabled();
    expect(screen.getAllByRole('combobox')[0]).toBeDisabled();
  });
});
