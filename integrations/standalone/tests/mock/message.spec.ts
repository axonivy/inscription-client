import { test } from '@playwright/test';
import { selectDialog } from './combobox-util';
import { InscriptionView } from '../pageobjects/InscriptionView';

test.describe('Global Messages', () => {
  test('multiple errors', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.mock();
    await inscriptionView.expectHeaderMessages(['No User Dialog specified']);

    const casePart = inscriptionView.accordion('Case');
    await casePart.toggle();
    await casePart.macroInput('Name').clear();
    await inscriptionView.expectHeaderMessages(['Name must not be empty', 'No User Dialog specified']);
  });

  test('no messages', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.mock();
    await inscriptionView.expectHeaderMessages(['No User Dialog specified']);

    const callPart = inscriptionView.accordion('Call');
    await callPart.toggle();
    await selectDialog(page);
    await inscriptionView.expectHeaderMessages([]);
  });
});
