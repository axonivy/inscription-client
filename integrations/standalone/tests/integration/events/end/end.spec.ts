import { test } from '@playwright/test';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import { NameTest, runTest } from '../../parts';
import { CreateProcessResult, createProcess } from '../../../glsp-protocol';

test.describe('End', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('TaskEndPage', { location: { x: 200, y: 200 } });
  });

  test.beforeEach(async ({ page }) => {
    view = await InscriptionView.selectElement(page, testee.elementId);
  });

  test('Header', async () => {
    await view.expectHeaderText('End');
  });

  test('Name', async () => {
    await runTest(view, NameTest);
  });
});
