import { test } from '@playwright/test';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import { ErrorCatchTest, NameTest, OutputTest, runTest } from '../../parts';
import { CreateProcessResult, createProcess } from '../../../glsp-protocol';

test.describe('Error', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('UserTask', { boundaryType: 'error' });
  });

  test.beforeEach(async ({ page }) => {
    view = await InscriptionView.selectElement(page, testee.elementId);
  });

  test('Header', async () => {
    await view.expectHeaderText('Error Boundary');
  });

  test('Name', async () => {
    await runTest(view, NameTest);
  });

  test('ErrorCatch', async () => {
    await runTest(view, ErrorCatchTest);
  });

  test('Output', async () => {
    await runTest(view, OutputTest);
  });
});
