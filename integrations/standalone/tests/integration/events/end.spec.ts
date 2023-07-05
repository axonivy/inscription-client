import { test } from '@playwright/test';
import { InscriptionView } from '../../pageobjects/InscriptionView';
import { EndPageTest, NameTest, NameTestWithoutTags, fillReloadAndAssert } from '../parts';

test.describe('End Events', () => {
  test('End', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A4921D0EF0B91-f11');
    await inscriptionView.expectHeaderText('End');
    await fillReloadAndAssert(inscriptionView, [NameTest]);
  });

  test('End Page', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A4921D0EF0B91-f12');
    await inscriptionView.expectHeaderText('End Page');
    await fillReloadAndAssert(inscriptionView, [NameTest, EndPageTest]);
  });

  test('Error End', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A4921D0EF0B91-f13');
    await inscriptionView.expectHeaderText('Error End');
    await fillReloadAndAssert(inscriptionView, [NameTest]);
  });

  test('Embedded End', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('0169A49845D37011-S10-g1');
    await inscriptionView.expectHeaderText('Embedded End');
    await fillReloadAndAssert(inscriptionView, [NameTestWithoutTags]);
  });

  test('Sub End', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A4A2A4DC8B908-f1');
    await inscriptionView.expectHeaderText('Sub End');
    await fillReloadAndAssert(inscriptionView, [NameTest]);
  });

  test('WS End', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A4A3BFDC7DFFE-ws1');
    await inscriptionView.expectHeaderText('WS End');
    await fillReloadAndAssert(inscriptionView, [NameTest]);
  });

  test('Process End', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('167356B1245C7158-f1');
    await inscriptionView.expectHeaderText('Process End');
    await fillReloadAndAssert(inscriptionView, [NameTest]);
  });

  test('Exit End', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('167356B1245C7158-f4');
    await inscriptionView.expectHeaderText('Exit End');
    await fillReloadAndAssert(inscriptionView, [NameTest]);
  });
});
