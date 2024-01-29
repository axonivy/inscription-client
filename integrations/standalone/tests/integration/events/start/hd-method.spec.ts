import { test } from '@playwright/test';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import { MethodResultTest, MethodStartTest, GeneralTest, runTest } from '../../parts';
import type { CreateProcessResult } from '../../../glsp-protocol';
import { createProcess } from '../../../glsp-protocol';

test.describe('Method Start', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('HtmlDialogMethodStart');
  });

  test.beforeEach(async ({ page }) => {
    view = await InscriptionView.selectElement(page, testee.elementId);
  });

  test('Header', async () => {
    await view.expectHeaderText('Method Start');
  });

  test('General', async () => {
    await runTest(view, GeneralTest);
  });

  test('Start', async () => {
    await runTest(view, MethodStartTest);
  });

  test('Result', async () => {
    await runTest(view, MethodResultTest);
  });
});
