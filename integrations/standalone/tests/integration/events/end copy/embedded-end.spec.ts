import { test } from '@playwright/test';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import { NameTestWithoutTags, runTest } from '../../parts';
import { CreateProcessResult, createProcess } from '../../../glsp-protocol';

test.describe('ErrorEnd', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('EmbeddedProcessElement');
  });

  test.beforeEach(async ({ page }) => {
    view = new InscriptionView(page);
    await view.selectElement(`${testee.elementId}-g1`);
  });

  test('Header', async () => {
    await view.expectHeaderText('Embedded End');
  });

  test('Name', async () => {
    await runTest(view, NameTestWithoutTags);
  });
});