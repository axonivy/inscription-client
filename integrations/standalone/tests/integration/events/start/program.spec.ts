import { test } from '@playwright/test';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import { NameTest, runTest } from '../../parts';
import { CreateProcessResult, createProcess } from '../../../glsp-protocol';
import { ProgramStartTest } from '../../parts/program-start';

test.describe('Program Start', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('ProgramStart');
  });

  test.beforeEach(async ({ page }) => {
    view = await InscriptionView.selectElement(page, testee.elementId);
  });

  test('Header', async () => {
    await view.expectHeaderText('Program Start');
  });

  test('Name', async () => {
    await runTest(view, NameTest);
  });

  test('Start', async () => {
    await runTest(view, ProgramStartTest);
  });
});
