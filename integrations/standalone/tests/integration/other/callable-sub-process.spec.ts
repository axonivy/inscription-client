import { test } from '@playwright/test';
import { InscriptionView } from '../../pageobjects/InscriptionView';
import { NameTestWithDisabledName, PermissionsTest, ProcessDataTest, runTest } from '../parts';
import { CreateProcessResult, createProcess } from '../../glsp-protocol';

test.describe('Callable Sub Process', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('Database', { processKind: 'CALLABLE_SUB' });
  });

  test.beforeEach(async ({ page }) => {
    view = await InscriptionView.selectElement(page, testee.processId);
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
    await runTest(view, PermissionsTest());
  });
});
