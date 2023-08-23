import { test } from '@playwright/test';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import { CodeTest, NameTest, ErrorThrowTest, runTest } from '../../parts';
import { CreateProcessResult, createProcess } from '../../../glsp-protocol';

test.describe('Error End', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('ErrorEnd', { location: { x: 200, y: 200 } });
  });

  test.beforeEach(async ({ page }) => {
    view = new InscriptionView(page);
    await view.selectElement(testee.elementId);
  });

  test('Header', async () => {
    await view.expectHeaderText('Error End');
  });

  test('Name', async () => {
    await runTest(view, NameTest);
  });

  test('Error', async () => {
    await runTest(view, ErrorThrowTest);
  });

  test('Code', async () => {
    await runTest(view, CodeTest);
  });
});
