import { test } from '@playwright/test';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import { NameTest, OutputTest, runTest } from '../../parts';
import { CreateProcessResult, createProcess } from '../../../glsp-protocol';

test.describe('Event Start', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('HtmlDialogEventStart');
  });

  test.beforeEach(async ({ page }) => {
    view = await InscriptionView.selectElement(page, testee.elementId);
  });

  test('Header', async () => {
    await view.expectHeaderText('Event Start');
  });

  test('Name', async () => {
    await runTest(view, NameTest);
  });

  test('Output', async () => {
    await runTest(view, OutputTest);
  });
});
