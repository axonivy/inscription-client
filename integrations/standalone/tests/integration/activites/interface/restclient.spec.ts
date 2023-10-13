import { test } from '@playwright/test';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import { NameTest, RestRequestOpenApiTest, RestRequestTest, RestResponseTest, runTest } from '../../parts';
import { CreateProcessResult, createProcess } from '../../../glsp-protocol';
import { RestRequestBodyEntityTest, RestRequestBodyFormTest, RestRequestBodyJaxRsTest, RestRequestBodyOpenApiTest, RestRequestBodyRawTest } from '../../parts/rest-request-body';

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

  test('RequestBody - Entity', async () => {
    await runTest(view, RestRequestBodyEntityTest);
  });

  test('RequestBody - Form', async () => {
    await runTest(view, RestRequestBodyFormTest);
  });

  test('RequestBody - Raw', async () => {
    await runTest(view, RestRequestBodyRawTest);
  });

  test('RequestBody - JaxRs', async () => {
    await runTest(view, RestRequestBodyJaxRsTest);
  });

  test('RequestBody - OpenApi', async () => {
    await runTest(view, RestRequestBodyOpenApiTest);
  });

  test.skip('Response', async () => {
    await runTest(view, RestResponseTest);
  });
});
