import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { InscriptionView } from '../../pageobjects/InscriptionView';
import { browserBtn, code } from './browser-mock-utils';

test.describe('Table Column browser', () => {
  test('browser add table column with all fields', async ({ page }) => {
    const inscriptionView = await InscriptionView.mock(page, { type: 'Database' });
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
    await applyTableColBrowser(page, 'Test ColumnString', 0, 2);
    await expect(code(page).getByRole('textbox')).toHaveValue('Test Column');
  });

  test('browser add table column with one field', async ({ page }) => {
    const inscriptionView = await InscriptionView.mock(page, { type: 'Database' });
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
    await applyTableColBrowser(page, 'Test ColumnString', 0, 1);
    await expect(code(page).getByRole('textbox')).toHaveValue('Test Column');
  });

  test('browser add table column doubleclick', async ({ page }) => {
    const inscriptionView = await InscriptionView.mock(page, { type: 'Database' });
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
    await applyTableColBrowser(page, 'Table Column', 0, undefined, true);
    await expect(code(page).getByRole('textbox')).toHaveValue('Test Column');
  });

  async function applyTableColBrowser(page: Page, expectedSelection: string = '', rowToCheck: number, numberOfRows?: number, dblClick?: boolean) {
    await browserBtn(page).nth(0).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByText('Table Column').first().click();

    if (dblClick) {
      await page.getByRole('row').nth(rowToCheck).click();
      await page.getByRole('row').nth(rowToCheck).dblclick();
    } else {
      if (numberOfRows) {
        expect(page.getByRole('row')).toHaveCount(numberOfRows);
      }
      await page.getByRole('row').nth(rowToCheck).click();
      await expect(page.locator('.browser-helptext')).toHaveText(expectedSelection);
      await page.getByRole('button', { name: 'Apply' }).click();
    }

    await expect(page.getByRole('dialog')).toBeHidden();
    await expect(browserBtn(page).nth(0)).toBeVisible();
  }
});
