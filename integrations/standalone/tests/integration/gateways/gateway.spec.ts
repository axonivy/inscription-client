import { test } from '@playwright/test';
import { InscriptionView } from '../../pageobjects/InscriptionView';
import { CaseTest, ConditionTest, EndPageTest, NameTest, OutputTest, TasksTest, fillReloadAndAssert } from '../parts';

test.describe('Gateways', () => {
  test('Alternative', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A4921D0EF0B91-f5');
    await inscriptionView.expectHeaderText('Alternative');
    await fillReloadAndAssert(inscriptionView, [NameTest, ConditionTest]);
  });

  test('Join', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A4921D0EF0B91-f7');
    await inscriptionView.expectHeaderText('Join');
    await fillReloadAndAssert(inscriptionView, [NameTest, OutputTest]);
  });

  test('Split', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A4921D0EF0B91-f6');
    await inscriptionView.expectHeaderText('Split');
    await fillReloadAndAssert(inscriptionView, [NameTest, OutputTest]);
  });

  test('Tasks', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A4921D0EF0B91-f8');
    await inscriptionView.expectHeaderText('Tasks');
    await fillReloadAndAssert(inscriptionView, [NameTest, OutputTest, TasksTest, CaseTest, EndPageTest]);
  });
});
