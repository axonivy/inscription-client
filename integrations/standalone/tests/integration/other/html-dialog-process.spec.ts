import { test } from '@playwright/test';
import { InscriptionView } from '../../pageobjects/InscriptionView';
import { NameTestWithDisabledName, PermissionsTest, runTest } from '../parts';
import { CreateProcessResult, createProcess } from '../../glsp-protocol';

test.describe('HTML Dialog Process', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('Database', { processKind: 'HTML_DIALOG' });
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

  test('Permissions', async () => {
    await runTest(view, PermissionsTest(false));
  });
});
