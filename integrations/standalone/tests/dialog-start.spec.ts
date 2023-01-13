import { test, expect } from '@playwright/test';
import { selectDialog } from './combobox-util';

test.describe('Dialog Starts', () => {
  test('change will update mapping tree', async ({ page }) => {
    await page.goto('');
    await page.getByRole('tab', { name: 'Call' }).click();

    await selectDialog(page, 'AcceptRequest');
    await expect(page.getByRole('row')).toHaveCount(3);

    await selectDialog(page, 'test1');
    await expect(page.getByRole('row')).toHaveCount(1);
  });
});
