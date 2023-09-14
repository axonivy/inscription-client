import { test } from '@playwright/test';
import { InscriptionView } from '../../pageobjects/InscriptionView';
import { NameTestWithDisabledName, runTest } from '../parts';
import { CreateProcessResult, createProcess } from '../../glsp-protocol';
import { ProcessDataTest } from '../parts/process-data';
import { PermissionsTest } from '../parts/permissions';

test.describe('Business Process', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('Database');
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

  test('Process Data', async () => {
    await runTest(view, ProcessDataTest);
  });

  test('Permissions', async () => {
    await runTest(view, PermissionsTest);
  });
});
