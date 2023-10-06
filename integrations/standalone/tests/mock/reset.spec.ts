import { expect, test } from '@playwright/test';
import { InscriptionView } from '../pageobjects/InscriptionView';

test.describe('Reset part', () => {
  test('reset button', async ({ page }) => {
    const inscriptionView = await InscriptionView.mock(page);
    const part = inscriptionView.accordion('Name');
    await part.toggle();

    const resetBtn = part.resetButton();
    await expect(resetBtn).not.toBeVisible();
    const name = part.textArea('Display name');
    await name.fill('bla');
    await expect(resetBtn).toBeVisible();

    await resetBtn.click();
    await name.expectValue('test name');
  });
});
