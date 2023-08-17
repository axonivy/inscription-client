import { test } from '@playwright/test';
import { NameTestWithoutTags, fillReloadAndAssert } from '../parts';
import { InscriptionView } from '../../pageobjects/InscriptionView';

test.describe('BPMN Activities', () => {
  test('Generic', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.type('GenericBpmnElement');
    await inscriptionView.expectHeaderText('Generic');
    await fillReloadAndAssert(inscriptionView, [NameTestWithoutTags]);
  });

  test('User', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.type('UserBpmnElement');
    await inscriptionView.expectHeaderText('User');
  });

  test('Manual', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.type('ManualBpmnElement');
    await inscriptionView.expectHeaderText('Manual');
  });

  test('Script', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.type('ScriptBpmnElement');
    await inscriptionView.expectHeaderText('Script');
  });

  test('Service', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.type('ServiceBpmnElement');
    await inscriptionView.expectHeaderText('Service');
  });

  test('Rule', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.type('RuleBpmnElement');
    await inscriptionView.expectHeaderText('Rule');
  });

  test('Receive', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.type('ReceiveBpmnElement');
    await inscriptionView.expectHeaderText('Receive');
  });

  test('Send', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.type('SendBpmnElement');
    await inscriptionView.expectHeaderText('Send');
  });
});
