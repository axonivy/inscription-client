import { Page, expect, test } from '@playwright/test';
import { CodeEditorUtil } from '../utils/code-editor-util';

test.describe('Script browser', () => {
  test('browser add to input', async ({ page }) => {
    await page.goto('mock.html');
    await page.getByRole('button', { name: 'Task' }).click();

    await assertCodeHidden(page);
    await page.getByLabel('Description').click();
    await assertCodeVisible(page);

    await applyBrowser(page, 'in.bla');
    await CodeEditorUtil.assertValue(page, '<%=in.bla%>');
  });

  test('browser replace selection', async ({ page }) => {
    await page.goto('mock.html');
    await page.getByRole('button', { name: 'Task' }).click();

    await assertCodeHidden(page);
    await page.getByLabel('Category').click();
    await assertCodeVisible(page);

    await CodeEditorUtil.fill(page, 'test 123 zag');
    await page.getByRole('code').dblclick();

    await applyBrowser(page, 'in.bla');
    await CodeEditorUtil.assertValue(page, 'test 123 <%=in.bla%>');
  });

  async function assertCodeHidden(page: Page) {
    await expect(page.getByRole('code')).toBeHidden();
    await expect(page.getByRole('button', { name: 'Browser' })).toBeHidden();
  }

  async function assertCodeVisible(page: Page) {
    await expect(page.getByRole('code')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Browser' })).toBeVisible();
  }

  async function applyBrowser(page: Page, expectedSelection: string) {
    await page.getByRole('button', { name: 'Browser' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.getByRole('row').nth(2).click();
    await expect(page.locator('.browser-helptext')).toHaveText(expectedSelection);
    await page.getByRole('button', { name: 'Insert' }).click();

    await expect(page.getByRole('dialog')).toBeHidden();
    await expect(page.getByRole('button', { name: 'Browser' })).toBeVisible();
  }
});
