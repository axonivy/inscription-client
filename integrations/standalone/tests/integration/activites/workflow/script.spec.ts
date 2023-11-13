import { test } from '@playwright/test';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import { GeneralTest, OutputCodeTest, ScriptOutputTest, runTest } from '../../parts';
import type { CreateProcessResult} from '../../../glsp-protocol';
import { createProcess } from '../../../glsp-protocol';

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

  test('General', async () => {
    await runTest(view, GeneralTest);
  });

  test('Output', async () => {
    await runTest(view, ScriptOutputTest);
  });

  test('Code', async () => {
    await runTest(view, OutputCodeTest);
  });
});
