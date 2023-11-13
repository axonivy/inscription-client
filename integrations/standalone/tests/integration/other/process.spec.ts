import { test } from '@playwright/test';
import { InscriptionView } from '../../pageobjects/InscriptionView';
import { GeneralTestWithDisabledName, PermissionsTest, ProcessDataTest, runTest } from '../parts';
import type { CreateProcessResult} from '../../glsp-protocol';
import { createProcess } from '../../glsp-protocol';

test.describe('Business Process', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('Database');
  });

  test.beforeEach(async ({ page }) => {
    view = await InscriptionView.selectElement(page, testee.processId);
  });

  test('Header', async () => {
    await view.expectHeaderText(testee.processUUID);
  });

  test('General', async () => {
    await runTest(view, GeneralTestWithDisabledName);
  });

  test('Process Data', async () => {
    await runTest(view, ProcessDataTest);
  });

  test('Permissions', async () => {
    await runTest(view, PermissionsTest());
  });
});
