import { test, expect } from '@playwright/test';
import { selectDialog } from './combobox-util';

test.describe('Global Messages', () => {
  test('multiple errors', async ({ page }) => {
    await page.goto('mock.html');
    const warning = page.locator('.header-status:text("Description is empty")');
    const error = page.locator('.header-status:text("Name must not be empty")');
    await expect(warning).toBeHidden();
    await expect(error).toBeHidden();

    await page.getByRole('button', { name: 'Name' }).click();
    await page.getByLabel('Display name').clear();
    await expect(warning).toBeHidden();
    await expect(error).toBeVisible();

    await page.getByLabel('Description').clear();
    await expect(warning).toBeVisible();
    await expect(error).toBeVisible();
  });

  test('name if no messages', async ({ page }) => {
    await page.goto('mock.html');
    const warning = page.locator('.header-status:text("No User Dialog specified")');
    const msgs = page.locator('.header-messages');
    await expect(warning).toBeVisible();
    await expect(msgs).toBeVisible();

    await page.getByRole('button', { name: 'Call' }).click();
    await selectDialog(page);
    await expect(warning).toBeHidden();
    await expect(msgs).toBeHidden();
  });
});
