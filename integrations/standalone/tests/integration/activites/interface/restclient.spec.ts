import { test } from '@playwright/test';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import {
  GeneralTest,
  RestRequestBodyEntityTest,
  RestRequestBodyFormTest,
  RestRequestBodyJaxRsTest,
  RestRequestBodyRawTest,
  RestRequestTest,
  RestResponseTest,
  runTest
} from '../../parts';
import type { CreateProcessResult } from '../../../glsp-protocol';
import { createProcess } from '../../../glsp-protocol';

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

  test('General', async () => {
    await runTest(view, GeneralTest);
  });

  test.skip('Request', async () => {
    await runTest(view, RestRequestTest);
  });

  test.skip('RequestBody - Entity', async () => {
    await runTest(view, RestRequestBodyEntityTest);
  });

  test.skip('RequestBody - Form', async () => {
    await runTest(view, RestRequestBodyFormTest);
  });

  test('RequestBody - Raw', async () => {
    await runTest(view, RestRequestBodyRawTest);
  });

  test('RequestBody - JaxRs', async () => {
    await runTest(view, RestRequestBodyJaxRsTest);
  });

  test.skip('Response', async () => {
    await runTest(view, RestResponseTest);
  });
});
