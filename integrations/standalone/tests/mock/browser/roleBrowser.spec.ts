import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { InscriptionView } from '../../pageobjects/InscriptionView';
import { assertCodeHidden, browserBtn } from './browser-mock-utils';

test.describe('Role browser', () => {
  test('browser add role', async ({ page }) => {
    const inscriptionView = await InscriptionView.mock(page);
    const task = inscriptionView.accordion('Task');
    await task.toggle();
    await assertCodeHidden(page);
    await applyRoleBrowser(page, 'Employee', 1);
    await expect(page.getByRole('combobox').nth(1)).toHaveText('Employee');
  });

  test('browser add role doubleclick', async ({ page }) => {
    const inscriptionView = await InscriptionView.mock(page);
    const task = inscriptionView.accordion('Task');
    await task.toggle();
    await assertCodeHidden(page);
    await applyRoleBrowser(page, undefined, 1, true);
    await expect(page.getByRole('combobox').nth(1)).toHaveText('Employee');
  });

  async function applyRoleBrowser(page: Page, expectedSelection: string = '', rowToCheck: number, dblClick?: boolean) {
    await browserBtn(page).nth(0).click();
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.getByText('Role').nth(1).click();
    await page.getByRole('row').nth(rowToCheck).click();

    if (dblClick) {
      await page.getByRole('row').nth(rowToCheck).dblclick();
    } else {
      await expect(page.locator('.browser-helptext')).toHaveText(expectedSelection);
      await page.getByRole('button', { name: 'Apply' }).click();
    }

    await expect(page.getByRole('dialog')).toBeHidden();
    await expect(browserBtn(page).nth(0)).toBeVisible();
  }
});
