import { test } from '@playwright/test';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import { NameTest, OutputCodeTest, ScriptOutputTest, runTest } from '../../parts';
import { CreateProcessResult, createProcess } from '../../../glsp-protocol';

test.describe('Script', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('Script');
  });

  test.beforeEach(async ({ page }) => {
    view = await InscriptionView.selectElement(page, testee.elementId);
  });

  test('Header', async () => {
    await view.expectHeaderText('Script');
  });

  test('Name', async () => {
    await runTest(view, NameTest);
  });

  test('Output', async () => {
    await runTest(view, ScriptOutputTest);
  });

  test('Code', async () => {
    await runTest(view, OutputCodeTest);
  });
});
