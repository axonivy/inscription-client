import type { ScriptVariable } from '@axonivy/inscription-protocol';
import ParameterTable from './ParameterTable';
import { render, screen, userEvent, TableUtil } from 'test-utils';

describe('ParameterTable', () => {
  const customFields: ScriptVariable[] = [
    { name: 'field1', type: 'String', desc: 'this is a string' },
    { name: 'number', type: 'Number', desc: '1' }
  ];
  function renderTable(): {
    data: () => ScriptVariable[];
    rerender: () => void;
  } {
    let data: ScriptVariable[] = customFields;
    const view = render(<ParameterTable data={data} onChange={change => (data = change)} />);
    return {
      data: () => data,
      // eslint-disable-next-line testing-library/no-unnecessary-act
      rerender: () => view.rerender(<ParameterTable data={data} onChange={change => (data = change)} />)
    };
  }

  test('table will render', () => {
    renderTable();
    TableUtil.assertHeaders(['Name', 'Type', 'Description', '', '']);
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

    expect(view.data()).toEqual([
      { name: 'Hello', type: 'String', desc: 'this is a string' },
      { name: 'number', type: 'Number', desc: '1' }
    ]);
  });

  test('table support readonly mode', async () => {
    render(<ParameterTable data={customFields} onChange={() => {}} />, { wrapperProps: { editor: { readonly: true } } });
    TableUtil.assertReadonly();
    expect(screen.getByDisplayValue(/field1/)).toBeDisabled();
  });

  test('table hide description column', async () => {
    render(<ParameterTable data={customFields} onChange={() => {}} hideDesc={true} />);
    TableUtil.assertHeaders(['Name', 'Type', '', '']);
  });
});
