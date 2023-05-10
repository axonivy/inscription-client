import { test, expect } from '@playwright/test';

test.describe('Readonly', () => {
  test('edit mode', async ({ page }) => {
    await page.goto('mock.html');
    await page.getByRole('button', { name: 'Name' }).click();
    await expect(page.getByLabel('Display name')).not.toBeDisabled();
  });

  test('readonly mode', async ({ page }) => {
    await page.goto('mock.html?readonly=true');
    await page.getByRole('button', { name: 'Name' }).click();
    await expect(page.getByLabel('Display name')).toBeDisabled();
  });
});
