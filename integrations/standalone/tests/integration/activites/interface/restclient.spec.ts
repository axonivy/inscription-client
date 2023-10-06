import { test } from '@playwright/test';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import { NameTest, RestRequestOpenApiTest, RestRequestTest, RestResponseTest, runTest } from '../../parts';
import { CreateProcessResult, createProcess } from '../../../glsp-protocol';

test.describe('Rest Client', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('RestClientCall');
  });

  test.beforeEach(async ({ page }) => {
    view = await InscriptionView.selectElement(page, testee.elementId);
  });

  test('Header', async () => {
    await view.expectHeaderText('Rest Client');
  });

  test('Name', async () => {
    await runTest(view, NameTest);
  });

  test('Request', async () => {
    await runTest(view, RestRequestTest);
  });

  test('Request - OpenApi', async () => {
    await runTest(view, RestRequestOpenApiTest);
  });

  test('Response', async () => {
    await runTest(view, RestResponseTest);
  });
});
