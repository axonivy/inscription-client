import React from 'react';
import { Document } from '@axonivy/inscription-core';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DocumentTable from './DocumentTable';
import { ReadonlyContextInstance } from '../../../context';

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

  function assertTableHeaders(expectedHeaders: string[]) {
    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(expectedHeaders.length);
    headers.forEach((header, index) => {
      expect(header).toHaveTextContent(expectedHeaders[index]);
    });
  }

  function assertTableRows(expectedRows: (RegExp | string)[]) {
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(expectedRows.length);
    rows.forEach((row, index) => {
      expect(row).toHaveAccessibleName(expectedRows[index]);
    });
  }

  function assertTableRowCount(expectedRows: number): Promise<void> {
    return waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(expectedRows));
  }

  test('table will render', () => {
    renderTable();
    assertTableHeaders(['Name', 'URL', 'Actions', '']);
    assertTableRows([/Name/, /Doc 1 axonivy.com/, /ivyTeam ❤️ ivyteam.ch/, '']);
  });

  test('table can sort columns', async () => {
    renderTable();
    const columnHeader = screen.getByRole('button', { name: 'Name' });
    await userEvent.click(columnHeader);
    assertTableHeaders(['Name 🔼', 'URL', 'Actions', '']);
    assertTableRows([/Name/, /Doc 1 axonivy.com/, /ivyTeam ❤️ ivyteam.ch/, '']);

    await userEvent.click(columnHeader);
    assertTableHeaders(['Name 🔽', 'URL', 'Actions', '']);
    assertTableRows([/Name/, /ivyTeam ❤️ ivyteam.ch/, /Doc 1 axonivy.com/, '']);
  });

  test('table can add new row', async () => {
    const view = renderTable();
    await assertTableRowCount(4);

    const addButton = screen.getByRole('button', { name: 'Add row' });
    await userEvent.click(addButton);
    expect(view.data()).toHaveLength(3);

    view.rerender();
    await assertTableRowCount(5);
  });

  test('table can remove a row', async () => {
    const view = renderTable();
    await assertTableRowCount(4);

    const removeButtons = screen.getAllByRole('button', { name: 'Remove row' });
    expect(removeButtons).toHaveLength(2);
    await userEvent.click(removeButtons[0]);
    expect(view.data()).toHaveLength(1);

    view.rerender();
    await assertTableRowCount(3);
  });

  test('table can add/remove rows by keyboard', async () => {
    const view = renderTable();
    await assertTableRowCount(4);

    const addButton = screen.getByRole('button', { name: 'Add row' });
    addButton.focus();
    await userEvent.keyboard('[Enter]');
    expect(view.data()).toHaveLength(3);

    view.rerender();
    await assertTableRowCount(5);

    const removeButtons = screen.getAllByRole('button', { name: 'Remove row' });
    expect(removeButtons).toHaveLength(3);
    removeButtons[2].focus();
    await userEvent.keyboard('[Enter]');
    expect(view.data()).toHaveLength(2);

    view.rerender();
    await assertTableRowCount(4);
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
    render(
      <ReadonlyContextInstance.Provider value={true}>
        <DocumentTable data={documents} onChange={() => {}} />
      </ReadonlyContextInstance.Provider>
    );

    expect(screen.getByRole('button', { name: 'Add row' })).toBeDisabled();
    expect(screen.getAllByRole('button', { name: 'Remove row' })[0]).toBeDisabled();
    expect(screen.getByDisplayValue(/Doc 1/)).toBeDisabled();
  });
});
