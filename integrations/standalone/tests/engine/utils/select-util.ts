import { Page, expect } from '@playwright/test';

export namespace SelectUtil {
  export async function select(page: Page, value: string, index: number) {
    await page.getByRole('combobox').nth(index).click();
    await page.getByRole('option', { name: value }).first().click();
  }

  export async function assertSelect(page: Page, value: RegExp, index: number) {
    await expect(page.getByRole('combobox').nth(index)).toHaveText(value);
  }
}
