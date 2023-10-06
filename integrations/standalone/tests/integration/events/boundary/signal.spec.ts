import { test } from '@playwright/test';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import { BoundarySignalCatchTest, NameTest, OutputTest, runTest } from '../../parts';
import { CreateProcessResult, createProcess } from '../../../glsp-protocol';

test.describe('Signal', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('UserTask', { boundaryType: 'signal' });
  });

  test.beforeEach(async ({ page }) => {
    view = await InscriptionView.selectElement(page, testee.elementId);
  });

  test('Header', async () => {
    await view.expectHeaderText('Signal Boundary');
  });

  test('Name', async () => {
    await runTest(view, NameTest);
  });

  test('SignalCatch', async () => {
    await runTest(view, BoundarySignalCatchTest);
  });

  test('Output', async () => {
    await runTest(view, OutputTest);
  });
});
