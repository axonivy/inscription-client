import { test } from '@playwright/test';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import { NameTest, WsRequestTest, runTest } from '../../parts';
import { CreateProcessResult, createProcess } from '../../../glsp-protocol';
import { DataCacheTest } from '../../parts/db-cache';

test.describe('Web Service', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('WebServiceCall');
  });

  test.beforeEach(async ({ page }) => {
    view = new InscriptionView(page);
    await view.selectElement(testee.elementId);
  });

  test('Header', async () => {
    await view.expectHeaderText('Web Service');
  });

  test('Name', async () => {
    await runTest(view, NameTest);
  });

  test('Request', async () => {
    await runTest(view, WsRequestTest);
  });

  test('Data Cache', async () => {
    await runTest(view, DataCacheTest);
  });
});
