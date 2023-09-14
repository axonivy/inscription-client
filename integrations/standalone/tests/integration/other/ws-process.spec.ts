import { test } from '@playwright/test';
import { InscriptionView } from '../../pageobjects/InscriptionView';
import { NameTestWithDisabledName, runTest } from '../parts';
import { CreateProcessResult, createProcess } from '../../glsp-protocol';
import { ProcessDataTest } from '../parts/process-data';
import { PermissionsTest } from '../parts/permissions';
import { WebServiceProcessTest } from '../parts/web-service-process';

test.describe('Web Service Process', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('WebserviceStart', { processKind: 'WEB_SERVICE' });
  });

  test.beforeEach(async ({ page }) => {
    view = new InscriptionView(page);
    await view.selectElement(testee.processId);
  });

  test('Header', async () => {
    await view.expectHeaderText(testee.processUUID);
  });

  test('Name', async () => {
    await runTest(view, NameTestWithDisabledName);
  });

  test('Web Service Process', async () => {
    await runTest(view, WebServiceProcessTest);
  });

  test('Process Data', async () => {
    await runTest(view, ProcessDataTest);
  });

  test('Permissions', async () => {
    await runTest(view, PermissionsTest);
  });
});
