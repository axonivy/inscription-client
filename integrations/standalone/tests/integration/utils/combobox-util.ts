import { Page, expect } from '@playwright/test';

export namespace ComboboxUtil {
  export async function select(page: Page, value: string, label?: string) {
    const combobox = page.getByRole('combobox', { name: label });
    await combobox.fill(value);
    await page.getByRole('option', { name: value }).first().click();
  }

  export async function setValue(page: Page, value: string, label?: string) {
    const combobox = page.getByRole('combobox', { name: label });
    await combobox.fill(value);
  }

  export async function assertSelect(page: Page, value: string, label?: string) {
    await expect(page.getByRole('combobox', { name: label })).toHaveValue(value);
  }
}
