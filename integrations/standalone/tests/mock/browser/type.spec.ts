import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { InscriptionView } from '../../pageobjects/InscriptionView';
import { assertCodeHidden, assertCodeVisible, browserBtn, code } from './browser-mock-utils';

test('browser init searchfilter', async ({ page }) => {
  const inscriptionView = await InscriptionView.mock(page);
  const task = inscriptionView.accordion('Dialog');
  await task.toggle();

  const codeSection = task.section('Code');
  await codeSection.open();
  const codeField = codeSection.scriptArea();
  await codeField.fill('handle');

  await code(page).dblclick();
  await browserBtn(page).click();
  await expect(page.getByRole('dialog')).toBeVisible();

  await page.getByText('Type').last().click();

  await expect(page.getByPlaceholder('Search')).toHaveValue('handle');
});

test('browser add type', async ({ page }) => {
  const inscriptionView = await InscriptionView.mock(page);
  const task = inscriptionView.accordion('Task');
  await task.toggle();

  await task.section('Expiry').open();
  const timeout = task.macroArea('Timeout');
  await assertCodeHidden(page);
  await timeout.focus();
  await assertCodeVisible(page);

  await applyTypeBrowser(page, 0, 'ch.ivyteam.test.Person');
  await expect(code(page).getByRole('textbox')).toHaveValue('ch.ivyteam.test.Person');
});

test('browser add type as list', async ({ page }) => {
  const inscriptionView = await InscriptionView.mock(page);
  const task = inscriptionView.accordion('Task');
  await task.toggle();

  await task.section('Expiry').open();
  const timeout = task.macroArea('Timeout');
  await assertCodeHidden(page);
  await timeout.focus();
  await assertCodeVisible(page);

  await applyTypeBrowser(page, 0, 'ch.ivyteam.test.Person', true);
  await expect(code(page).getByRole('textbox')).toHaveValue('List<ch.ivyteam.test.Person>');
});

test('browser add type doubleclick', async ({ page }) => {
  const inscriptionView = await InscriptionView.mock(page);
  const task = inscriptionView.accordion('Task');
  await task.toggle();

  await task.section('Expiry').open();
  const timeout = task.macroArea('Timeout');
  await assertCodeHidden(page);
  await timeout.focus();
  await assertCodeVisible(page);

  await applyTypeBrowser(page, 0, undefined, undefined, true);
  await expect(code(page).getByRole('textbox')).toHaveValue('ch.ivyteam.test.Person');
});

async function applyTypeBrowser(page: Page, rowToCheck: number, expectedSelection: string = '', checkListGeneric?: boolean, dblClick?: boolean) {
  await browserBtn(page).nth(0).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByText('Type').first().click();
  await page.getByRole('row').nth(rowToCheck).click();

  if (dblClick) {
    await page.getByRole('row').nth(rowToCheck).dblclick();
  } else {
    if (checkListGeneric) {
      await page.getByLabel('Use Type as List').click();
      await expect(page.locator('.browser-helptext')).toHaveText('List<' + expectedSelection + '>');
    } else {
      await expect(page.locator('.browser-helptext')).toHaveText(expectedSelection);
    }
    await page.getByRole('button', { name: 'Apply' }).click();
  }

  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(browserBtn(page).nth(0)).toBeVisible();
}
