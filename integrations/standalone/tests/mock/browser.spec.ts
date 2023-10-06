import { Page, expect, test } from '@playwright/test';
import { InscriptionView } from '../pageobjects/InscriptionView';

test.describe('Script browser', () => {
  test('browser add to input', async ({ page }) => {
    const inscriptionView = await InscriptionView.mock(page);
    const task = inscriptionView.accordion('Task');
    await task.toggle();

    const description = task.macroArea('Description');
    await assertCodeHidden(page);
    await description.focus();
    await assertCodeVisible(page);

    await applyBrowser(page, 'in.bla');
    await expect(code(page).getByRole('textbox')).toHaveValue('<%=in.bla%>');
  });

  test('browser replace selection', async ({ page }) => {
    const inscriptionView = await InscriptionView.mock(page);
    const task = inscriptionView.accordion('Task');
    await task.toggle();

    const category = task.macroInput('Category');
    await assertCodeHidden(page);
    await category.focus();
    await assertCodeVisible(page);

    await page.keyboard.type('test 123 zag');
    await code(page).dblclick();

    await applyBrowser(page, 'in.bla');
    await expect(code(page).getByRole('textbox')).toHaveValue('test 123 <%=in.bla%>');
  });

  async function assertCodeHidden(page: Page) {
    await expect(code(page)).toBeHidden();
    await expect(browserBtn(page)).toBeHidden();
  }

  async function assertCodeVisible(page: Page) {
    await expect(code(page)).toBeVisible();
    await expect(browserBtn(page)).toBeVisible();
  }

  async function applyBrowser(page: Page, expectedSelection: string) {
    await browserBtn(page).click();
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.getByRole('row').nth(2).click();
    await expect(page.locator('.browser-helptext')).toHaveText(expectedSelection);
    await page.getByRole('button', { name: 'Insert' }).click();

    await expect(page.getByRole('dialog')).toBeHidden();
    await expect(browserBtn(page)).toBeVisible();
  }

  function code(page: Page) {
    return page.getByRole('code');
  }

  function browserBtn(page: Page) {
    return page.getByRole('button', { name: 'Browser' });
  }
});
