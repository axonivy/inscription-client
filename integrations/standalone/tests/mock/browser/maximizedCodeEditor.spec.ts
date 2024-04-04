import { expect, test } from '@playwright/test';
import { InscriptionView } from '../../pageobjects/InscriptionView';
import { assertCodeVisible, code } from './browser-mock-utils';

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
