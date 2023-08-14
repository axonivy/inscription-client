import { test } from '@playwright/test';
import { InscriptionView } from '../../pageobjects/InscriptionView';
import { CaseTest, EndPageTest, NameTest, OutputTest, TaskIntermediateTaskTest, WaitTaskTest, fillReloadAndAssert } from '../parts';

test.describe('Intermediate Events', () => {
  test('Task', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A4921D0EF0B91-f9');
    await inscriptionView.expectHeaderText('Task');
    await fillReloadAndAssert(inscriptionView, [NameTest, OutputTest, TaskIntermediateTaskTest, CaseTest, EndPageTest]);
  });

  test('Wait', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A4921D0EF0B91-f10');
    await inscriptionView.expectHeaderText('Wait');
    await fillReloadAndAssert(inscriptionView, [NameTest, WaitTaskTest, OutputTest]);
  });
});
