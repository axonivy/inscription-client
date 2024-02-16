import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
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

    await applyBrowser(page, 'in.bla', 'Attribute', 2);
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

    await applyBrowser(page, 'in.bla', 'Attribute', 2);
    await expect(code(page).getByRole('textbox')).toHaveValue('test 123 <%=in.bla%>');
  });

  test('browser init searchfilter', async ({ page }) => {
    const inscriptionView = await InscriptionView.mock(page);
    const task = inscriptionView.accordion('Call');
    await task.toggle();

    await page.getByText('Code').click();
    const codeField = task.scriptArea();
    await codeField.fill('handle');

    await code(page).dblclick();
    await browserBtn(page).click();
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.getByText('Type').last().click();

    await expect(page.getByPlaceholder('Search')).toHaveValue('handle');
  });

  test('browser add cms string', async ({ page }) => {
    const inscriptionView = await InscriptionView.mock(page);
    const task = inscriptionView.accordion('Task');
    await task.toggle();

    const description = task.macroArea('Description');
    await assertCodeHidden(page);
    await description.focus();
    await assertCodeVisible(page);

    await applyBrowser(page, 'ivy.cms.co("/hallo")en: hello', 'CMS', 2);
    await expect(code(page).getByRole('textbox')).toHaveValue('<%=ivy.cms.co("/hallo")%>');
  });

  test('browser add cms file', async ({ page }) => {
    const inscriptionView = await InscriptionView.mock(page);
    const task = inscriptionView.accordion('Task');
    await task.toggle();

    const description = task.macroArea('Description');
    await assertCodeHidden(page);
    await description.focus();
    await assertCodeVisible(page);

    await applyBrowser(page, 'ivy.cms.cr("/BlaFile")', 'CMS', 1);
    await expect(code(page).getByRole('textbox')).toHaveValue('<%=ivy.cms.cr("/BlaFile")%>');
  });

  test('browser add role', async ({ page }) => {
    const inscriptionView = await InscriptionView.mock(page);
    const task = inscriptionView.accordion('Task');
    await task.toggle();
    await assertCodeHidden(page);
    await applyBrowser(page, 'Employee', 'Role', 1);
    await expect(page.getByRole('combobox').nth(1)).toHaveText('Employee');
  });

  test('browser add table column with all fields', async ({ page }) => {
    const inscriptionView = await InscriptionView.mock(page);
    await page.goto('?type=Database');
    const query = inscriptionView.accordion('Query');
    await query.toggle();
    const allFieldsCheckbox = query.checkbox('Select all fields');
    await allFieldsCheckbox.expectUnchecked();
    await allFieldsCheckbox.click();

    const condition = query.section('Condition');
    await condition.expectIsClosed();
    await condition.open();
    const conditionField = condition.macroArea();
    await conditionField.focus();
    await applyBrowser(page, 'Test ColumnString', 'Table Column', 0, undefined, undefined, 2);
    await expect(code(page).getByRole('textbox')).toHaveValue('Test Column');
  });

  test('browser add table column with one field', async ({ page }) => {
    const inscriptionView = await InscriptionView.mock(page);
    await page.goto('?type=Database');
    const query = inscriptionView.accordion('Query');
    await query.toggle();
    const allFieldsCheckbox = query.checkbox('Select all fields');
    await allFieldsCheckbox.expectUnchecked();
    await page.getByRole('row').nth(1).click();

    const condition = query.section('Condition');
    await condition.expectIsClosed();
    await condition.open();
    const conditionField = condition.macroArea();
    await conditionField.focus();
    await applyBrowser(page, 'Test ColumnString', 'Table Column', 0, undefined, undefined, 1);
    await expect(code(page).getByRole('textbox')).toHaveValue('Test Column');
  });

  test('browser add type', async ({ page }) => {
    const inscriptionView = await InscriptionView.mock(page);
    const task = inscriptionView.accordion('Task');
    await task.toggle();

    await page.getByText('Expiry').click();
    const timeout = task.macroArea('Timeout');
    await assertCodeHidden(page);
    await timeout.focus();
    await assertCodeVisible(page);

    await applyBrowser(page, 'ch.ivyteam.test.Person', 'Type', 0, undefined, 1);
    await expect(code(page).getByRole('textbox')).toHaveValue('ch.ivyteam.test.Person');
  });

  test('browser add type as list', async ({ page }) => {
    const inscriptionView = await InscriptionView.mock(page);
    const task = inscriptionView.accordion('Task');
    await task.toggle();

    await page.getByText('Expiry').click();
    const timeout = task.macroArea('Timeout');
    await assertCodeHidden(page);
    await timeout.focus();
    await assertCodeVisible(page);

    await applyBrowser(page, 'ch.ivyteam.test.Person', 'Type', 0, true, 1);
    await expect(code(page).getByRole('textbox')).toHaveValue('java.util.List<ch.ivyteam.test.Person>');
  });

  test('browser add cms doubleclick', async ({ page }) => {
    const inscriptionView = await InscriptionView.mock(page);
    const task = inscriptionView.accordion('Task');
    await task.toggle();

    const description = task.macroArea('Description');
    await assertCodeHidden(page);
    await description.focus();
    await assertCodeVisible(page);

    await applyBrowserDblClick(page, 'CMS', 2);
    await expect(code(page).getByRole('textbox')).toHaveValue('<%=ivy.cms.co("/hallo")%>');
  });

  test('browser add attribute doubleclick', async ({ page }) => {
    const inscriptionView = await InscriptionView.mock(page);
    const task = inscriptionView.accordion('Task');
    await task.toggle();

    const description = task.macroArea('Description');
    await assertCodeHidden(page);
    await description.focus();
    await assertCodeVisible(page);

    await applyBrowserDblClick(page, 'Attribute', 2);
    await expect(code(page).getByRole('textbox')).toHaveValue('<%=in.bla%>');
  });

  test('browser add role doubleclick', async ({ page }) => {
    const inscriptionView = await InscriptionView.mock(page);
    const task = inscriptionView.accordion('Task');
    await task.toggle();
    await assertCodeHidden(page);
    await applyBrowserDblClick(page, 'Role', 1);
    await expect(page.getByRole('combobox').nth(1)).toHaveText('Employee');
  });

  test('browser add type doubleclick', async ({ page }) => {
    const inscriptionView = await InscriptionView.mock(page);
    const task = inscriptionView.accordion('Task');
    await task.toggle();

    await page.getByText('Expiry').click();
    const timeout = task.macroArea('Timeout');
    await assertCodeHidden(page);
    await timeout.focus();
    await assertCodeVisible(page);

    await applyBrowserDblClick(page, 'Type', 0, 1);
    await expect(code(page).getByRole('textbox')).toHaveValue('ch.ivyteam.test.Person');
  });

  test('browser add table column doubleclick', async ({ page }) => {
    const inscriptionView = await InscriptionView.mock(page);
    await page.goto('?type=Database');
    const query = inscriptionView.accordion('Query');
    await query.toggle();
    const allFieldsCheckbox = query.checkbox('Select all fields');
    await allFieldsCheckbox.expectUnchecked();
    await allFieldsCheckbox.click();

    const condition = query.section('Condition');
    await condition.expectIsClosed();
    await condition.open();
    const conditionField = condition.macroArea();
    await conditionField.focus();
    await applyBrowserDblClick(page, 'Table Column', 0);
    await expect(code(page).getByRole('textbox')).toHaveValue('Test Column');
  });

  test('maximized code editor', async ({ page }) => {
    const inscriptionView = await InscriptionView.mock(page);
    const task = inscriptionView.accordion('Task');
    await task.toggle();

    await page.getByText('Code').click();
    const codeField = task.scriptArea();
    await codeField.focus();
    await assertCodeVisible(page);
    //check if value is transfered to maximized code editor
    await codeField.fill('test');
    const maximizedButton = page.getByRole('button', { name: 'Fullsize Code Editor' });
    await maximizedButton.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    const maximizedCodeEditor = code(page);
    await expect(maximizedCodeEditor.getByRole('textbox')).toHaveValue('test');
    //check if value is transfered to minimized code editor
    await maximizedCodeEditor.click();
    await page.keyboard.type('hello');
    await page.getByRole('button', { name: 'Apply' }).click();
    await expect(page.getByRole('dialog')).toBeHidden();
    await expect(code(page).getByRole('textbox')).toHaveValue('testhello');
  });

  async function assertCodeHidden(page: Page) {
    await expect(code(page)).toBeHidden();
    await expect(browserBtn(page)).toHaveCount(1);
  }

  async function assertCodeVisible(page: Page) {
    await expect(code(page)).toBeVisible();
    await expect(browserBtn(page)).toHaveCount(2);
  }

  async function applyBrowser(
    page: Page,
    expectedSelection: string,
    browser: string,
    rowToCheck: number,
    checkListGeneric?: boolean,
    numberOfBrowserButton?: number,
    numberOfRows?: number
  ) {
    await browserBtn(page)
      .nth(numberOfBrowserButton ? numberOfBrowserButton : 0)
      .click();
    await expect(page.getByRole('dialog')).toBeVisible();

    if (browser === 'Role') {
      await page.getByText(browser).nth(1).click();
    } else {
      await page.getByText(browser).first().click();
    }

    if (browser === 'Table Column' && numberOfRows) {
      expect(page.getByRole('row')).toHaveCount(numberOfRows);
    }
    await page.getByRole('row').nth(rowToCheck).click();

    if (checkListGeneric && browser === 'Type') {
      await page.getByLabel('Use Type as List').click();
      await expect(page.locator('.browser-helptext')).toHaveText('java.util.List<' + expectedSelection + '>');
    } else {
      await expect(page.locator('.browser-helptext')).toHaveText(expectedSelection);
    }
    await page.getByRole('button', { name: 'Apply' }).click();

    await expect(page.getByRole('dialog')).toBeHidden();
    await expect(browserBtn(page).nth(numberOfBrowserButton ? numberOfBrowserButton : 0)).toBeVisible();
  }

  async function applyBrowserDblClick(page: Page, browser: string, rowToCheck: number, numberOfBrowserButton?: number) {
    await browserBtn(page)
      .nth(numberOfBrowserButton ? numberOfBrowserButton : 0)
      .click();
    await expect(page.getByRole('dialog')).toBeVisible();

    if (browser === 'Role') {
      await page.getByText(browser).nth(1).click();
    } else {
      await page.getByText(browser).first().click();
    }

    await page.getByRole('row').nth(rowToCheck).click();
    await page.getByRole('row').nth(rowToCheck).dblclick();

    await expect(page.getByRole('dialog')).toBeHidden();
    await expect(browserBtn(page).nth(numberOfBrowserButton ? numberOfBrowserButton : 0)).toBeVisible();
  }

  function code(page: Page) {
    return page.getByRole('code');
  }

  function browserBtn(page: Page) {
    return page.getByRole('button', { name: 'Browser' });
  }
});
