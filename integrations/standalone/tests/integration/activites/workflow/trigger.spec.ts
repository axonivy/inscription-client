import { test } from '@playwright/test';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import { NameTest, TriggerCallTest, runTest } from '../../parts';
import { CreateProcessResult, createProcess } from '../../../glsp-protocol';
import { OutputTest } from '../../parts';

test.describe('Trigger', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('TriggerCall');
  });

  test.beforeEach(async ({ page }) => {
    view = new InscriptionView(page);
    await view.selectElement(testee.elementId);
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
