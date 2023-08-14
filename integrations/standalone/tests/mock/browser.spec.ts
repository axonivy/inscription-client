import { InscriptionView } from '../pageobjects/InscriptionView';
import { test, expect } from '../test';

test.describe('Script browser', () => {
  test('browser add to input', async ({ view }) => {
    await view.mock();
    const task = view.accordion('Task');
    await task.toggle();

    const description = task.macroArea('Description');
    await assertCodeHidden(view);
    await description.focus();
    await assertCodeVisible(view);

    await applyBrowser(view, 'in.bla');
    await expect(code(view).getByRole('textbox')).toHaveValue('<%=in.bla%>');
  });

  test('browser replace selection', async ({ view }) => {
    await view.mock();
    const task = view.accordion('Task');
    await task.toggle();

    const category = task.macroInput('Category');
    await assertCodeHidden(view);
    await category.focus();
    await assertCodeVisible(view);

    await view.page.keyboard.type('test 123 zag');
    await view.page.getByRole('code').dblclick();

    await applyBrowser(view, 'in.bla');
    await expect(code(view).getByRole('textbox')).toHaveValue('test 123 <%=in.bla%>');
  });

  async function assertCodeHidden(view: InscriptionView) {
    await expect(code(view)).toBeHidden();
    await expect(browserBtn(view)).toBeHidden();
  }

  async function assertCodeVisible(view: InscriptionView) {
    await expect(code(view)).toBeVisible();
    await expect(browserBtn(view)).toBeVisible();
  }

  async function applyBrowser(view: InscriptionView, expectedSelection: string) {
    await browserBtn(view).click();
    await expect(view.page.getByRole('dialog')).toBeVisible();

    await view.page.getByRole('row').nth(2).click();
    await expect(view.page.locator('.browser-helptext')).toHaveText(expectedSelection);
    await view.page.getByRole('button', { name: 'Insert' }).click();

    await expect(view.page.getByRole('dialog')).toBeHidden();
    await expect(browserBtn(view)).toBeVisible();
  }

  function code(view: InscriptionView) {
    return view.page.getByRole('code');
  }

  function browserBtn(view: InscriptionView) {
    return view.page.getByRole('button', { name: 'Browser' });
  }
});
