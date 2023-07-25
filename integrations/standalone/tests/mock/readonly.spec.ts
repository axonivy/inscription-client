import { test, expect } from '@playwright/test';
import { InscriptionView } from '../pageobjects/InscriptionView';

test.describe('Readonly', () => {
  test('edit mode', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.mock();
    const name = inscriptionView.accordion('Name');
    await name.toggle();
    await name.textArea('Display name').expectEnabled();
  });

  test('readonly mode', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.mock({ readonly: true });
    const name = inscriptionView.accordion('Name');
    await name.toggle();
    await name.textArea('Display name').expectDisabled();
  });
});
