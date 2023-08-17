import { test } from '@playwright/test';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import { MethodResultTest, MethodStartTest, NameTest, runTest } from '../../parts';
import { CreateProcessResult, createProcess } from '../../../glsp-protocol';

test.describe('Method Start', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('HtmlDialogMethodStart');
  });

  test.beforeEach(async ({ page }) => {
    view = new InscriptionView(page);
    await view.selectElement(testee.elementId);
  });

  test('Header', async () => {
    await view.expectHeaderText('Method Start');
  });

  test('Name', async () => {
    await runTest(view, NameTest);
  });

  test('Start', async () => {
    await runTest(view, MethodStartTest);
  });

  test('Result', async () => {
    await runTest(view, MethodResultTest);
  });
});
