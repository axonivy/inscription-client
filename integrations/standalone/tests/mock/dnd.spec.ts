import { expect, test } from '@playwright/test';

test.describe('Drag and drop features', () => {
  test('Alternative condition reorder', async ({ page, browserName }) => {
    if (browserName === 'webkit') {
      return; //drag and drop on this table is not working in the webkit test...
    }
    await page.goto('mock.html?type=Alternative');
    const conditions = page.getByRole('button', { name: 'Condition' });
    await conditions.click();

    const rows = page.locator('.dnd-row');
    await expect(rows).toHaveCount(2);
    await expect(rows.first()).toHaveText(/Mock Element/);
    await expect(rows.last()).toHaveText(/f6/);

    await rows.first().locator('.dnd-row-handle').dragTo(rows.last().locator('.dnd-row-handle'));
    await expect(rows.first()).toHaveText(/f6/);
    await expect(rows.last()).toHaveText(/Mock Element/);
  });
});
