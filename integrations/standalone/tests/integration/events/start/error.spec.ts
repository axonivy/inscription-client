import { test } from '@playwright/test';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import { ErrorCatchTest, NameTest, OutputTest, runTest } from '../../parts';
import { CreateProcessResult, createProcess } from '../../../glsp-protocol';

test.describe('Error Start', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('ErrorStartEvent');
  });

  test.beforeEach(async ({ page }) => {
    view = new InscriptionView(page);
    await view.selectElement(testee.elementId);
  });

  test('Header', async () => {
    await view.expectHeaderText('Error Start');
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
