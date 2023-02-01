import { Document } from '@axonivy/inscription-protocol';
import DocumentTable from './DocumentTable';
import { render, screen, TableUtil, userEvent } from 'test-utils';

describe('DocumentTable', () => {
  const documents: Document[] = [
    { name: 'Doc 1', url: 'axonivy.com' },
    { name: 'ivyTeam ❤️', url: 'ivyteam.ch' }
  ];
  function renderTable(): {
    data: () => Document[];
    rerender: () => void;
  } {
    let data: Document[] = [];
    const view = render(<DocumentTable data={documents} onChange={change => (data = change)} />);
    return {
      data: () => data,
      // eslint-disable-next-line testing-library/no-unnecessary-act
      rerender: () => view.rerender(<DocumentTable data={data} onChange={change => (data = change)} />)
    };
  }

  test('table will render', () => {
    renderTable();
    TableUtil.assertHeaders(['Name', 'URL', 'Actions', '']);
    TableUtil.assertRows([/Name/, /Doc 1 axonivy.com/, /ivyTeam ❤️ ivyteam.ch/, '']);
  });

  test('table can sort columns', async () => {
    renderTable();
    const columnHeader = screen.getByRole('button', { name: 'Name' });
    await userEvent.click(columnHeader);
    TableUtil.assertHeaders(['Name 🔼', 'URL', 'Actions', '']);
    TableUtil.assertRows([/Name/, /Doc 1 axonivy.com/, /ivyTeam ❤️ ivyteam.ch/, '']);

    await userEvent.click(columnHeader);
    TableUtil.assertHeaders(['Name 🔽', 'URL', 'Actions', '']);
    TableUtil.assertRows([/Name/, /ivyTeam ❤️ ivyteam.ch/, /Doc 1 axonivy.com/, '']);
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
    await userEvent.tab(); // column header 1
    await userEvent.tab(); // column header 2
    await userEvent.tab();
    expect(screen.getByDisplayValue(/Doc 1/)).toHaveFocus();
    await userEvent.keyboard('Hello');
    await userEvent.tab();
    view.rerender();

    const descInput = screen.getByDisplayValue(/ivyteam.ch/);
    await userEvent.clear(descInput);
    await userEvent.type(descInput, 'World');

    expect(view.data()).toEqual([
      { name: 'Hello', url: 'axonivy.com' },
      { name: 'ivyTeam ❤️', url: 'ivyteam.ch' }
    ]);
  });

  test('table support readonly mode', async () => {
    render(<DocumentTable data={documents} onChange={() => {}} />, { wrapperProps: { editor: { readonly: true } } });
    TableUtil.assertReadonly();
    expect(screen.getByDisplayValue(/Doc 1/)).toBeDisabled();
  });
});
