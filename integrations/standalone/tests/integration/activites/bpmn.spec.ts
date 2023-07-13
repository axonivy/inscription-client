import { test } from '@playwright/test';
import { NameTestWithoutTags, fillReloadAndAssert } from '../parts';
import { InscriptionView } from '../../pageobjects/InscriptionView';

test.describe('BPMN Activities', () => {
  test('Generic', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A49F1790F4A32-G10');
    await inscriptionView.expectHeaderText('Generic');
    await fillReloadAndAssert(inscriptionView, [NameTestWithoutTags]);
  });

  test('User', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A49F1790F4A32-U20');
    await inscriptionView.expectHeaderText('User');
  });

  test('Manual', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A49F1790F4A32-M30');
    await inscriptionView.expectHeaderText('Manual');
  });

  test('Script', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A49F1790F4A32-S80');
    await inscriptionView.expectHeaderText('Script');
  });

  test('Service', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A49F1790F4A32-S70');
    await inscriptionView.expectHeaderText('Service');
  });

  test('Rule', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A49F1790F4A32-R50');
    await inscriptionView.expectHeaderText('Rule');
  });

  test('Receive', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A49F1790F4A32-R40');
    await inscriptionView.expectHeaderText('Receive');
  });

  test('Send', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A49F1790F4A32-S60');
    await inscriptionView.expectHeaderText('Send');
  });
});
