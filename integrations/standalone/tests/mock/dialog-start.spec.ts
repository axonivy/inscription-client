import { test, expect } from '@playwright/test';
import { selectDialog } from './combobox-util';

test.describe('Dialog Starts', () => {
  test('change will update mapping tree', async ({ page }) => {
    await page.goto('mock.html');
    await page.getByRole('button', { name: 'Call' }).click();

    await selectDialog(page, 'AcceptRequest');
    await expect(page.getByRole('row')).toHaveCount(12);

    await selectDialog(page, 'test1');
    await expect(page.getByRole('row')).toHaveCount(4);
  });
});
