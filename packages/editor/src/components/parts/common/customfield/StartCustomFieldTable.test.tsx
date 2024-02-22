import type { StartCustomStartField } from '@axonivy/inscription-protocol';
import { render, screen, userEvent, TableUtil } from 'test-utils';
import StartCustomFieldTable from './StartCustomFieldTable';
import { describe, test, expect } from 'vitest';

describe('StartCustomFieldTable', () => {
  const customFields: StartCustomStartField[] = [
    { name: 'field1', value: 'this is a string' },
    { name: 'number', value: '1' }
  ];
  function renderTable(): {
    data: () => StartCustomStartField[];
    rerender: () => void;
  } {
    let data: StartCustomStartField[] = customFields;
    const view = render(<StartCustomFieldTable data={data} onChange={change => (data = change)} />);
    return {
      data: () => data,
      // eslint-disable-next-line testing-library/no-unnecessary-act
      rerender: () => view.rerender(<StartCustomFieldTable data={data} onChange={change => (data = change)} />)
    };
  }

  test('table will render', () => {
    renderTable();
    TableUtil.assertHeaders(['Name', 'Expression']);
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

  test('table support readonly mode', async () => {
    render(<StartCustomFieldTable data={customFields} onChange={() => {}} />, {
      wrapperProps: { editor: { readonly: true } }
    });
    TableUtil.assertReadonly();
    expect(screen.getByDisplayValue(/field1/)).toBeDisabled();
    expect(screen.getByDisplayValue('1')).toBeDisabled();
  });
});
