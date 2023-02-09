import { Page } from '@playwright/test';

export async function selectDialog(page: Page, value: string = 'AcceptRequest'): Promise<void> {
  const combobox = page.getByRole('combobox');
  await combobox.fill(value);
  await page.getByRole('option', { name: value }).first().click();
}
