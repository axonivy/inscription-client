import { test } from '@playwright/test';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import { NameTest, OutputTest, SignalCatchTest, runTest } from '../../parts';
import { CreateProcessResult, createProcess } from '../../../glsp-protocol';

test.describe('Signal Start', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('SignalStartEvent');
  });

  test.beforeEach(async ({ page }) => {
    view = await InscriptionView.selectElement(page, testee.elementId);
  });

  test('Header', async () => {
    await view.expectHeaderText('Signal Start');
  });

  test('Name', async () => {
    await runTest(view, NameTest);
  });

  test('SignalCatch', async () => {
    await runTest(view, SignalCatchTest);
  });

  test('Output', async () => {
    await runTest(view, OutputTest);
  });
});
