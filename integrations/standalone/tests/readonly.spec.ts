import { test, expect } from '@playwright/test';

test.describe('Readonly', () => {
  test('edit mode', async ({ page }) => {
    await page.goto('');
    await expect(page.getByLabel('Display name')).not.toBeDisabled();
  });

  test('readonly mode', async ({ page }) => {
    await page.goto('?readonly=true');
    await expect(page.getByLabel('Display name')).toBeDisabled();
  });
});
