import { test } from '@playwright/test';
import { InscriptionView } from '../../pageobjects/InscriptionView';
import { ConditionTest, GeneralTest, runTest } from '../parts';
import type { CreateProcessResult } from '../../glsp-protocol';
import { createProcess } from '../../glsp-protocol';

test.describe('Alternative', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('Alternative', { connectTo: ['Script'] });
  });

  test.beforeEach(async ({ page }) => {
    view = await InscriptionView.selectElement(page, testee.elementId);
  });

  test('Header', async () => {
    await view.expectHeaderText('Alternative');
  });

  test('General', async () => {
    await runTest(view, GeneralTest);
  });

  test('Condition', async () => {
    await runTest(view, ConditionTest);
  });
});
