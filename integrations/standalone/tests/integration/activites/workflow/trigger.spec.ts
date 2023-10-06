import { test } from '@playwright/test';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import { NameTest, TriggerCallTest, runTest, OutputTest } from '../../parts';
import { CreateProcessResult, createProcess } from '../../../glsp-protocol';

test.describe('Trigger', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('TriggerCall');
  });

  test.beforeEach(async ({ page }) => {
    view = await InscriptionView.selectElement(page, testee.elementId);
  });

  test('Header', async () => {
    await view.expectHeaderText('Trigger');
  });

  test('Name', async () => {
    await runTest(view, NameTest);
  });

  test('Trigger', async () => {
    await runTest(view, TriggerCallTest);
  });

  test('Output', async () => {
    await runTest(view, OutputTest);
  });
});
