import { CustomField } from '@axonivy/inscription-protocol';
import CustomFieldTable from './CustomFieldTable';
import { render, screen, userEvent, TableUtil } from 'test-utils';

describe('CustomFieldTable', () => {
  const customFields: CustomField[] = [
    { name: 'field1', type: 'String', value: 'this is a string' },
    { name: 'number', type: 'Number', value: '1' }
  ];
  function renderTable(): {
    data: () => CustomField[];
    rerender: () => void;
  } {
    let data: CustomField[] = customFields;
    const view = render(<CustomFieldTable data={data} onChange={change => (data = change)} />);
    return {
      data: () => data,
      // eslint-disable-next-line testing-library/no-unnecessary-act
      rerender: () => view.rerender(<CustomFieldTable data={data} onChange={change => (data = change)} />)
    };
  }

  test('table will render', () => {
    renderTable();
    TableUtil.assertHeaders(['Name', 'Type', 'Expression', 'Actions', '']);
    TableUtil.assertRows([/field1/, /number/]);
  });

  test('table can sort columns', async () => {
    renderTable();
    const columnHeader = screen.getByRole('button', { name: 'Name' });
    await userEvent.click(columnHeader);
    const firstHeader = screen.getAllByRole('columnheader')[0];
    expect(firstHeader).toHaveTextContent('Name 🔼');
    TableUtil.assertRows([/field1/, /number/]);

    await userEvent.click(columnHeader);
    expect(firstHeader).toHaveTextContent('Name 🔽');
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
      { name: 'Hello', type: 'String', value: 'this is a string' },
      { name: 'number', type: 'String', value: '1' }
    ]);
  });

  test('table support readonly mode', async () => {
    render(<CustomFieldTable data={customFields} onChange={() => {}} />, { wrapperProps: { editor: { readonly: true } } });
    TableUtil.assertReadonly();
    expect(screen.getByDisplayValue(/field1/)).toBeDisabled();
    expect(screen.getAllByRole('combobox')[0]).toBeDisabled();
  });
});
