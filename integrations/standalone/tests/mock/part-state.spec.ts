import { test } from '@playwright/test';
import { selectDialog } from './combobox-util';
import { InscriptionView } from '../pageobjects/InscriptionView';

test.describe('Part states', () => {
  test('different states on different parts', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.mock();
    const casePart = inscriptionView.accordion('Case');
    const callPart = inscriptionView.accordion('Call');

    await casePart.expectState('configured');
    await callPart.expectState('warning');

    await casePart.toggle();
    await casePart.macroInput('Name').clear();
    await casePart.expectState('error');
    await callPart.expectState('warning');

    await callPart.toggle();
    await selectDialog(page);
    await casePart.expectState('error');
    await callPart.expectState('configured');
  });
});
