import { test } from '@playwright/test';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import { NameTest, OutputTest, runTest } from '../../parts';
import { CreateProcessResult, createProcess } from '../../../glsp-protocol';
import { QueryAnyTest, QueryDeleteTest, QueryReadTest, QueryUpdateTest, QueryWriteTest } from '../../parts/query';
import { DataCacheTest } from '../../parts/db-cache';

test.describe('Database', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeEach(async ({ page }) => {
    testee = await createProcess('Database');
    view = new InscriptionView(page);
    await view.selectElement(testee.elementId);
  });

  test('Header', async () => {
    await view.expectHeaderText('Database');
  });

  test('Name', async () => {
    await runTest(view, NameTest);
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

  test('Data Cache', async () => {
    await runTest(view, DataCacheTest);
  });

  test('Output', async () => {
    await runTest(view, OutputTest);
  });
});
