import { test } from '@playwright/test';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import { NameTest, SubCallTest, runTest } from '../../parts';
import { CreateProcessResult, createProcess } from '../../../glsp-protocol';
import { OutputTest } from '../../parts';

test.describe('Call Sub', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('SubProcessCall');
  });

  test.beforeEach(async ({ page }) => {
    view = new InscriptionView(page);
    await view.selectElement(testee.elementId);
  });

  test('Header', async () => {
    await view.expectHeaderText('Call');
  });

  test('Name', async () => {
    await runTest(view, NameTest);
  });

  test('SubCall', async () => {
    await runTest(view, SubCallTest);
  });

  test('Output', async () => {
    await runTest(view, OutputTest);
  });
});
