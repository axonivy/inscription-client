import { test } from '@playwright/test';
import { InscriptionView } from '../../pageobjects/InscriptionView';
import { CaseTest, ConditionTest, EndPageTest, NameTest, OutputTest, TasksTester, fillReloadAndAssert } from '../parts';

test.describe('Gateways', () => {
  test('Alternative', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.type('Alternative', { connectTo: ['Script'] });
    await inscriptionView.expectHeaderText('Alternative');
    await fillReloadAndAssert(inscriptionView, [NameTest, ConditionTest]);
  });

  test('Join', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.type('Join');
    await inscriptionView.expectHeaderText('Join');
    await fillReloadAndAssert(inscriptionView, [NameTest, OutputTest]);
  });

  test('Split', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.type('Split');
    await inscriptionView.expectHeaderText('Split');
    await fillReloadAndAssert(inscriptionView, [NameTest, OutputTest]);
  });

  test('Tasks', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    const { processId } = await inscriptionView.type('TaskSwitchGateway', { connectTo: ['Script'], additionalElements: ['ErrorStartEvent'] });
    await inscriptionView.expectHeaderText('Tasks');
    await fillReloadAndAssert(inscriptionView, [NameTest, OutputTest, new TasksTester(new RegExp(processId)), CaseTest, EndPageTest]);
  });
});
