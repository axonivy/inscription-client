import { screen, userEvent, waitFor } from 'test-utils';

export namespace TableUtil {
  export function assertHeaders(expectedHeaders: string[]) {
    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(expectedHeaders.length);
    headers.forEach((header, index) => {
      expect(header).toHaveTextContent(expectedHeaders[index]);
    });
  }

  export function assertRows(expectedRows: (RegExp | string)[]) {
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(expectedRows.length);
    rows.forEach((row, index) => {
      expect(row).toHaveAccessibleName(expectedRows[index]);
    });
  }

  export function assertRowCount(expectedRows: number): Promise<void> {
    return waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(expectedRows));
  }

  export async function assertAddRow(view: { data: () => any[]; rerender: () => void }, expectedRows: number): Promise<void> {
    await assertRowCount(expectedRows + 1);

    const addButton = screen.getByRole('button', { name: 'Add row' });
    await userEvent.click(addButton);
    expect(view.data()).toHaveLength(expectedRows);

    view.rerender();
    await assertRowCount(expectedRows + 2);
  }

  export async function assertRemoveRow(view: { data: () => any[]; rerender: () => void }, expectedRows: number): Promise<void> {
    await assertRowCount(expectedRows + 3);

    const removeButtons = screen.getAllByRole('button', { name: 'Remove row' });
    expect(removeButtons).toHaveLength(expectedRows + 1);
    await userEvent.click(removeButtons[0]);
    expect(view.data()).toHaveLength(expectedRows);

    view.rerender();
    await assertRowCount(expectedRows + 2);
  }

  export async function assertAddAndRemoveWithKeyboard(
    view: { data: () => any[]; rerender: () => void },
    defaultRows: number
  ): Promise<void> {
    await assertRowCount(defaultRows + 2);

    const addButton = screen.getByRole('button', { name: 'Add row' });
    addButton.focus();
    await userEvent.keyboard('[Enter]');
    expect(view.data()).toHaveLength(defaultRows + 1);

    view.rerender();
    await assertRowCount(defaultRows + 3);

    const removeButtons = screen.getAllByRole('button', { name: 'Remove row' });
    expect(removeButtons).toHaveLength(defaultRows + 1);
    removeButtons[2].focus();
    await userEvent.keyboard('[Enter]');
    expect(view.data()).toHaveLength(defaultRows);

    view.rerender();
    await assertRowCount(defaultRows + 2);
  }

  export function assertReadonly() {
    expect(screen.getByRole('button', { name: 'Add row' })).toBeDisabled();
    expect(screen.getAllByRole('button', { name: 'Remove row' })[0]).toBeDisabled();
  }
}
