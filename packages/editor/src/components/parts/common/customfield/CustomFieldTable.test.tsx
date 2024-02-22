import type { WfCustomField } from '@axonivy/inscription-protocol';
import CustomFieldTable from './CustomFieldTable';
import { render, screen, userEvent, TableUtil } from 'test-utils';
import { describe, test, expect } from 'vitest';

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
    const view = render(<CustomFieldTable data={data} onChange={change => (data = change)} type='CASE' />);
    return {
      data: () => data,
      // eslint-disable-next-line testing-library/no-unnecessary-act
      rerender: () => view.rerender(<CustomFieldTable data={data} onChange={change => (data = change)} type='CASE' />)
    };
  }

  test('table will render', () => {
    renderTable();
    TableUtil.assertHeaders(['Name', 'Type', 'Expression']);
    TableUtil.assertRows([/field1/, /number/]);
  });

  test('table can sort columns', async () => {
    renderTable();
    await userEvent.click(screen.getByRole('button', { name: 'Sort by Name' }));
    TableUtil.assertRows(['field1 this is a string', 'number 1']);

    await userEvent.click(screen.getByRole('button', { name: 'Sort by Name' }));
    TableUtil.assertRows(['number 1', 'field1 this is a string']);
  });

  test('table can add new row', async () => {
    const view = renderTable();
    await TableUtil.assertAddRow(view, 3);
  });

  test('table can remove a row', async () => {
    const view = renderTable();
    await TableUtil.assertRemoveRow(view, 1);
  });

  test.skip('table can add rows by keyboard', async () => {
    const view = renderTable();
    await TableUtil.assertAddRowWithKeyboard(view, 'number');

    expect(view.data()).toEqual([
      { name: 'field1', type: 'STRING', value: 'this is a string' },
      { name: 'number', type: 'NUMBER', value: '1' },
      { name: '', type: 'STRING', value: '' }
    ]);
  });

  test.skip('table can edit cells', async () => {
    const view = renderTable();
    const field1 = screen.getByDisplayValue(/field1/);
    await userEvent.dblClick(field1);
    await userEvent.type(field1, 'Hello[Tab]');
    view.rerender();

    const type = screen.getAllByRole('combobox')[1];
    await userEvent.click(type);
    await userEvent.click(type);
    await userEvent.keyboard('[ArrowDown][Enter]');

    expect(view.data()).toEqual([
      { name: 'Hello', type: 'STRING', value: 'this is a string' },
      { name: 'number', type: 'STRING', value: '1' },
      { name: '', type: 'STRING', value: '' }
    ]);
  });

  test('table support readonly mode', async () => {
    render(<CustomFieldTable data={customFields} onChange={() => {}} type='CASE' />, {
      wrapperProps: { editor: { readonly: true } }
    });
    TableUtil.assertReadonly();
    expect(screen.getByDisplayValue(/field1/)).toBeDisabled();
    expect(screen.getAllByRole('combobox')[0]).toBeDisabled();
  });
});
