import { test } from '@playwright/test';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import { NameTest, runTest } from '../../parts';
import { CreateProcessResult, createProcess } from '../../../glsp-protocol';

test.describe('Sub End', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('CallSubEnd', { location: { x: 200, y: 200 } });
  });

  test.beforeEach(async ({ page }) => {
    view = new InscriptionView(page);
    await view.selectElement(testee.elementId);
  });

  test('Header', async () => {
    await view.expectHeaderText('Sub End');
  });

  test('Name', async () => {
    await runTest(view, NameTest);
  });
});
