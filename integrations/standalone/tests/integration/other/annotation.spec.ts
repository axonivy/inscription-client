import { test } from '@playwright/test';
import { InscriptionView } from '../../pageobjects/InscriptionView';
import { NameTestWithoutTags, runTest } from '../parts';
import { CreateProcessResult, createProcess } from '../../glsp-protocol';

test.describe('Annotation', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('ProcessAnnotation');
  });

  test.beforeEach(async ({ page }) => {
    view = new InscriptionView(page);
    await view.selectElement(testee.elementId);
  });

  test('Header', async () => {
    await view.expectHeaderText('Note');
  });

  test('Name', async () => {
    await runTest(view, NameTestWithoutTags);
  });
});
