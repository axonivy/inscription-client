import { Locator, Page, expect } from '@playwright/test';

export class Table {
  private readonly rows: Locator;
  private readonly locator: Locator;

  constructor(page: Page, parentLocator: Locator, label?: string) {
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
    return new Row(this.rows, row);
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

export class Row {
  private readonly locator: Locator;

  constructor(rowsLocator: Locator, row: number) {
    this.locator = rowsLocator.nth(row);
  }

  async fill(values: string[]) {
    for (let i = 0; i < values.length; i++) {
      const input = this.locator.getByRole('textbox').nth(i);
      await input.fill(values[i]);
      await input.blur();
    }
  }

  column(column: number) {
    return new Cell(this.locator, column);
  }

  async remove() {
    await this.locator.getByRole('button', { name: 'Remove row' }).click();
  }
}

export class Cell {
  private readonly locator: Locator;

  constructor(rowLocator: Locator, column: number) {
    this.locator = rowLocator.getByRole('cell').nth(column);
  }

  async fill(value: string) {
    await this.locator.getByRole('textbox').fill(value);
  }

  async expectValue(value: string) {
    await expect(this.locator.getByRole('textbox')).toHaveValue(value);
  }
}
