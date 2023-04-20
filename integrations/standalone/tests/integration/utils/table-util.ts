import { expect, Page } from '@playwright/test';
import { CodeEditorUtil } from './code-editor-util';

export namespace TableUtil {
  export async function addRow(page: Page) {
    await page.getByRole('row', { name: 'Add row' }).click();
  }

  export async function removeRow(page: Page, rowIndex: number) {
    await page.getByRole('button', { name: 'Remove row' }).nth(rowIndex).click();
  }

  export async function fillRow(page: Page, rowIndex: number, values: string[]) {
    const row = page.locator('tbody').getByRole('row').nth(rowIndex);
    for (let i = 0; i < values.length; i++) {
      const input = row.getByRole('textbox').nth(i);
      await input.fill(values[i]);
      await input.blur();
    }
  }

  export async function fillExpression(page: Page, rowIndex: number, value: string) {
    await page.locator('tbody').getByRole('row').nth(rowIndex).getByRole('textbox').click();
    await CodeEditorUtil.type(page, value);
    await page.keyboard.press('Tab');
  }

  export async function assertRow(page: Page, rowIndex: number, values: string[]) {
    const row = page.locator('tbody').getByRole('row').nth(rowIndex);
    for (let i = 0; i < values.length; i++) {
      await expect(row.getByRole('textbox').nth(i)).toHaveValue(values[i]);
    }
  }

  export async function assertEmpty(page: Page) {
    await expect(page.locator('tbody tr')).toHaveCount(0);
  }
}
