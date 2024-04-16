import { test } from '@playwright/test';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import { GeneralTest, OutputTest, runTest } from '../../parts';
import type { CreateProcessResult } from '../../../glsp-protocol';
import { createProcess } from '../../../glsp-protocol';
import { QueryAnyTest, QueryDeleteTest, QueryReadTest, QueryUpdateTest, QueryWriteTest } from '../../parts/query';
import { DataCacheTest } from '../../parts/db-cache';

test.describe('Database', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeEach(async ({ page }) => {
    testee = await createProcess('Database');
    view = await InscriptionView.selectElement(page, testee.elementId);
  });

  test('Header', async () => {
    await view.expectHeaderText('Database');
  });

  test('General', async () => {
    await runTest(view, GeneralTest);
  });

  test('Query Read', async () => {
    await runTest(view, QueryReadTest);
  });

  test('Query Write', async () => {
    await runTest(view, QueryWriteTest);
  });

  test('Query Update', async () => {
    await runTest(view, QueryUpdateTest);
  });

  test('Query Delete', async () => {
    await runTest(view, QueryDeleteTest);
  });

  test('Query Any', async () => {
    await runTest(view, QueryAnyTest);
  });

  test('Cache', async () => {
    await runTest(view, DataCacheTest);
  });

  test('Output', async () => {
    await runTest(view, OutputTest);
  });
});
