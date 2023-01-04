import { test, expect } from '@playwright/test';

test.describe('Global Messages', () => {
  test('multiple errors', async ({ page }) => {
    await page.goto('');
    const info = page.locator('.header-status:text("test name")');
    const warning = page.locator('.header-status:text("Description is empty")');
    const error = page.locator('.header-status:text("Name must not be empty")');
    await expect(info).toBeVisible();
    await expect(warning).toBeHidden();
    await expect(error).toBeHidden();

    await page.getByLabel('Display name').clear();
    await expect(info).toBeHidden();
    await expect(warning).toBeHidden();
    await expect(error).toBeVisible();

    await page.getByLabel('Description').clear();
    await expect(info).toBeHidden();
    await expect(warning).toBeVisible();
    await expect(error).toBeVisible();
  });

  test.skip('name if no messages', async ({ page }) => {
    await page.goto('');
    const warning = page.locator('.header-status:text("No User Dialog specified")');
    const info = page.locator('.header-status:text("test name")');
    await expect(warning).toBeVisible();
    await expect(info).toBeHidden();

    await page.getByRole('tab', { name: 'Call' }).click();
    const dialog = page.getByLabel('Dialog');
    await dialog.fill('Acc');
    await page.getByRole('option', { name: 'AcceptRequest' }).first().click();
    await expect(warning).toBeHidden();
    await expect(info).toBeVisible();
  });
});
