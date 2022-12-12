import React from 'react';
import { render, screen } from '@testing-library/react';
import DocumentTable from './DocumentTable';
import { Doc } from '../../../data/document';
import userEvent from '@testing-library/user-event';

describe('DocumentTable', () => {
  const documents: Doc[] = [
    { description: 'Doc 1', url: 'axonivy.com' },
    { description: 'ivyTeam ❤️', url: 'ivyteam.ch' }
  ];

  function renderTable(
    options: {
      onChange?: (change: Doc[]) => void;
    } = {}
  ) {
    render(<DocumentTable data={documents} onChange={options.onChange ? options.onChange : () => {}} />);
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

  function assertTableRowCount(expectedRows: number) {
    expect(screen.getAllByRole('row')).toHaveLength(expectedRows);
  }

  test('table will render', () => {
    renderTable();
    assertTableHeaders(['Description', 'URL', 'Actions', '+']);
    assertTableRows([/Description/, /Doc 1 axonivy.com/, /ivyTeam ❤️ ivyteam.ch/, '+']);
  });

  test('table can sort columns', async () => {
    renderTable();
    const columnHeader = screen.getByRole('button', { name: 'Description' });
    await userEvent.click(columnHeader);
    assertTableHeaders(['Description 🔼', 'URL', 'Actions', '+']);
    assertTableRows([/Description/, /Doc 1 axonivy.com/, /ivyTeam ❤️ ivyteam.ch/, '+']);

    await userEvent.click(columnHeader);
    assertTableHeaders(['Description 🔽', 'URL', 'Actions', '+']);
    assertTableRows([/Description/, /ivyTeam ❤️ ivyteam.ch/, /Doc 1 axonivy.com/, '+']);
  });

  test('table can add new row', async () => {
    let data: Doc[] = [];
    renderTable({ onChange: (change: Doc[]) => (data = change) });
    assertTableRowCount(4);

    const addButton = screen.getByRole('button', { name: '+' });
    await userEvent.click(addButton);
    assertTableRowCount(5);
    expect(data).toHaveLength(3);
  });

  test('table can remove a row', async () => {
    let data: Doc[] = [];
    renderTable({ onChange: (change: Doc[]) => (data = change) });
    assertTableRowCount(4);

    const removeButtons = screen.getAllByRole('button', { name: '🗑️' });
    expect(removeButtons).toHaveLength(2);
    await userEvent.click(removeButtons[0]);
    assertTableRowCount(3);
    expect(data).toHaveLength(1);
  });

  test('table can add/remove rows by keyboard', async () => {
    let data: Doc[] = [];
    renderTable({ onChange: (change: Doc[]) => (data = change) });
    assertTableRowCount(4);

    const addButton = screen.getByRole('button', { name: '+' });
    addButton.focus();
    await userEvent.keyboard('[Enter]');
    assertTableRowCount(5);
    expect(data).toHaveLength(3);

    const removeButtons = screen.getAllByRole('button', { name: '🗑️' });
    expect(removeButtons).toHaveLength(3);
    removeButtons[2].focus();
    await userEvent.keyboard('[Enter]');
    assertTableRowCount(4);
    expect(data).toHaveLength(2);
  });

  test('table can edit cells', async () => {
    let data: Doc[] = [];
    renderTable({ onChange: (change: Doc[]) => (data = change) });

    await userEvent.tab(); // column header 1
    await userEvent.tab(); // column header 2
    await userEvent.tab();
    expect(screen.getByDisplayValue(/Doc 1/)).toHaveFocus();
    await userEvent.keyboard('Hello');
    await userEvent.tab();

    const descInput = screen.getByDisplayValue(/ivyteam.ch/);
    await userEvent.clear(descInput);
    await userEvent.type(descInput, 'World');

    expect(JSON.stringify(data)).toEqual(
      JSON.stringify([
        { description: 'Hello', url: 'axonivy.com' },
        { description: 'ivyTeam ❤️', url: 'ivyteam.ch' }
      ])
    );
  });
});
