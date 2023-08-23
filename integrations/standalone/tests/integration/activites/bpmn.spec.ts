import { test } from '@playwright/test';
import { NameTestWithoutTags, runTest } from '../parts';
import { InscriptionView } from '../../pageobjects/InscriptionView';
import { createProcess } from '../../glsp-protocol';

test.describe('BPMN Activities', () => {
  test('Generic', async ({ page }) => {
    const testee = await createProcess('GenericBpmnElement');
    const view = new InscriptionView(page);
    await view.selectElement(testee.elementId);
    await view.expectHeaderText('Generic');
    await runTest(view, NameTestWithoutTags);
  });

  test('User', async ({ page }) => {
    const testee = await createProcess('UserBpmnElement');
    const view = new InscriptionView(page);
    await view.selectElement(testee.elementId);
    await view.expectHeaderText('User');
  });

  test('Manual', async ({ page }) => {
    const testee = await createProcess('ManualBpmnElement');
    const view = new InscriptionView(page);
    await view.selectElement(testee.elementId);
    await view.expectHeaderText('Manual');
  });

  test('Script', async ({ page }) => {
    const testee = await createProcess('ScriptBpmnElement');
    const view = new InscriptionView(page);
    await view.selectElement(testee.elementId);
    await view.expectHeaderText('Script');
  });

  test('Service', async ({ page }) => {
    const testee = await createProcess('ServiceBpmnElement');
    const view = new InscriptionView(page);
    await view.selectElement(testee.elementId);
    await view.expectHeaderText('Service');
  });

  test('Rule', async ({ page }) => {
    const testee = await createProcess('RuleBpmnElement');
    const view = new InscriptionView(page);
    await view.selectElement(testee.elementId);
    await view.expectHeaderText('Rule');
  });

  test('Receive', async ({ page }) => {
    const testee = await createProcess('ReceiveBpmnElement');
    const view = new InscriptionView(page);
    await view.selectElement(testee.elementId);
    await view.expectHeaderText('Receive');
  });

  test('Send', async ({ page }) => {
    const testee = await createProcess('SendBpmnElement');
    const view = new InscriptionView(page);
    await view.selectElement(testee.elementId);
    await view.expectHeaderText('Send');
  });
});
