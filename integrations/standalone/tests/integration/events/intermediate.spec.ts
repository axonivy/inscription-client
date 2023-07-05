import { test } from '@playwright/test';
import { InscriptionView } from '../../pageobjects/InscriptionView';
import { CaseTest, EndPageTest, NameTest, OutputTest, TaskTester, fillReloadAndAssert } from '../parts';

test.describe('Intermediate Events', () => {
  test('Task', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A4921D0EF0B91-f9');
    await inscriptionView.expectHeaderText('Task');
    await fillReloadAndAssert(inscriptionView, [NameTest, OutputTest, new TaskTester({ error: /EventAndGateway/ }), CaseTest, EndPageTest]);
  });

  test('Wait', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A4921D0EF0B91-f10');
    await inscriptionView.expectHeaderText('Wait');
    await fillReloadAndAssert(inscriptionView, [NameTest, OutputTest]);
  });
});
