import { test } from '@playwright/test';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import { EndPageTest, NameTest, runTest } from '../../parts';
import { CreateProcessResult, createProcess } from '../../../glsp-protocol';

test.describe('End Page', () => {
  let testee: CreateProcessResult;
  let view: InscriptionView;

  test.beforeAll(async () => {
    testee = await createProcess('TaskEndPage', { location: { x: 200, y: 200 } });
  });

  test.beforeEach(async ({ page }) => {
    view = new InscriptionView(page);
    await view.selectElement(testee.elementId);
  });

  test('Header', async () => {
    await view.expectHeaderText('End Page');
  });

  test('Name', async () => {
    await runTest(view, NameTest);
  });

  test('EndPage', async () => {
    await runTest(view, EndPageTest);
  });
});
