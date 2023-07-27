import { Locator, Page, expect } from '@playwright/test';
import { CodeEditorUtil } from '../utils/code-editor-util';
import { Popover } from './Popover';

export class Table {
  private readonly rows: Locator;
  private readonly locator: Locator;

  constructor(readonly page: Page, parentLocator: Locator, readonly columns: ColumnType[], label?: string) {
    if (label === undefined) {
      this.locator = parentLocator;
    } else {
      this.locator = parentLocator.getByLabel(label);
    }
    this.rows = this.locator.locator('tbody tr:not(.row-message)');
  }

  async addRow() {
    var totalRows = await this.rows.count();
    await this.locator.getByRole('row', { name: 'Add row' }).click();
    return this.row(totalRows);
  }

  row(row: number) {
    return new Row(this.page, this.rows, row, this.columns);
  }

  cell(row: number, column: number) {
    return this.row(row).column(column);
  }

  async clear() {
    var totalRows = await this.rows.count();
    while (totalRows > 0) {
      for (let row = 0; row < totalRows; row++) {
        await this.row(row).remove();
      }
      totalRows = await this.rows.count();
    }
  }

  async expectRowCount(rows: number) {
    await expect(this.rows).toHaveCount(rows);
  }
}

export type ColumnType = 'label' | 'text' | 'expression';

export class Row {
  private readonly locator: Locator;

  constructor(readonly page: Page, rowsLocator: Locator, row: number, readonly columns: ColumnType[]) {
    this.locator = rowsLocator.nth(row);
  }

  async fill(values: string[]) {
    let value = 0;
    for (let column = 0; column < this.columns.length; column++) {
      if (this.columns[column] !== 'label') {
        const cell = this.column(column);
        await cell.fill(values[value++]);
      }
    }
  }

  column(column: number) {
    return new Cell(this.page, this.locator, column, this.columns[column]);
  }

  async expectValues(values: string[]) {
    let value = 0;
    for (let column = 0; column < this.columns.length; column++) {
      if (this.columns[column] !== 'label') {
        const cell = this.column(column++);
        await cell.expectValue(values[value++]);
      }
    }
  }

  async remove() {
    await this.locator.getByRole('button', { name: 'Remove row' }).click();
  }

  async dragTo(targetRow: Row) {
    const source = this.locator.locator('.dnd-row-handle');
    const target = targetRow.locator.locator('.dnd-row-handle');
    await source.dragTo(target);
  }
}

export class Cell {
  private readonly locator: Locator;

  constructor(readonly page: Page, rowLocator: Locator, column: number, readonly columnType: ColumnType) {
    this.locator = rowLocator.getByRole('cell').nth(column);
  }

  async fill(value: string) {
    switch (this.columnType) {
      case 'label':
        throw new Error('This column is not editable');
      case 'text':
        await this.fillText(value);
        break;
      case 'expression':
        await this.fillExpression(value);
        break;
    }
  }

  async edit(value: string) {
    const expression = this.locator.getByRole('textbox');
    await expect(expression).toHaveAttribute('aria-expanded', 'false');
    await expression.click();
    await CodeEditorUtil.type(this.page, value);
  }

  async expectValue(value: string) {
    await expect(this.locator.getByRole('textbox')).toHaveValue(value);
  }

  private async fillText(value: string) {
    const input = this.locator.getByRole('textbox');
    await input.fill(value);
    await input.blur();
  }

  private async fillExpression(value: string) {
    await this.edit(value);
    await new Popover(this.page).close();
  }
}
