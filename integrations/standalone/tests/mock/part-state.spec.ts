import { test, expect, Locator } from '@playwright/test';
import { selectDialog } from './combobox-util';

test.describe('Part states', () => {
  test('different states on different parts', async ({ page }) => {
    await page.goto('mock.html');
    const name = page.getByRole('button', { name: 'Name' }).locator('.accordion-state');
    const call = page.getByRole('button', { name: 'Call' }).locator('.accordion-state');
    await assertTabState(name, 'configured');
    await assertTabState(call, 'warning');

    await page.getByRole('button', { name: 'Name' }).click();
    await page.getByLabel('Display name').clear();
    await assertTabState(name, 'error');
    await assertTabState(call, 'warning');

    await page.getByRole('button', { name: 'Call' }).click();
    await selectDialog(page);
    await assertTabState(name, 'error');
    await assertTabState(call, 'configured');
  });

  async function assertTabState(tab: Locator, state: string): Promise<void> {
    await expect(tab).toHaveAttribute('data-state', state);
  }
});
