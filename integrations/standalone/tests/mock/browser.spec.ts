import { Page, expect, test } from '@playwright/test';
import { CodeEditorUtil } from '../utils/code-editor-util';

test.describe('Script browser', () => {
  test('browser add to input', async ({ page }) => {
    await page.goto('mock.html');
    await page.getByRole('button', { name: 'Task' }).click();

    await assertCodeHidden(page);
    await page.getByLabel('Description').click();
    await assertCodeVisible(page);

    await applyBrowser(page);
    await CodeEditorUtil.assertValue(page, 'attribute');
  });

  test('browser replace selection', async ({ page }) => {
    await page.goto('mock.html');
    await page.getByRole('button', { name: 'Task' }).click();

    await assertCodeHidden(page);
    await page.getByLabel('Category').click();
    await assertCodeVisible(page);

    await CodeEditorUtil.fill(page, 'test 123 bla');
    await page.getByRole('code').dblclick();

    await applyBrowser(page);
    await CodeEditorUtil.assertValue(page, 'test 123 attribute');
  });

  async function assertCodeHidden(page: Page) {
    await expect(page.getByRole('code')).toBeHidden();
    await expect(page.getByRole('button', { name: 'Browser' })).toBeHidden();
  }

  async function assertCodeVisible(page: Page) {
    await expect(page.getByRole('code')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Browser' })).toBeVisible();
  }

  async function applyBrowser(page: Page) {
    await page.getByRole('button', { name: 'Browser' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button', { name: 'Ok' }).click();

    await expect(page.getByRole('dialog')).toBeHidden();
    await expect(page.getByRole('button', { name: 'Browser' })).toBeVisible();
  }
});
