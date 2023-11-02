import { test } from '@playwright/test';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import { GeneralTest, OutputTest, TaskTester, runTest } from '../../parts';
import { CreateProcessResult, createProcess } from '../../../glsp-protocol';
import { EventTest } from '../../parts/event';

test.describe('Wait', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('WaitEvent', { additionalElements: ['ErrorStartEvent'] });
  });

  test.beforeEach(async ({ page }) => {
    view = await InscriptionView.selectElement(page, testee.elementId);
  });

  test('Header', async () => {
    await view.expectHeaderText('Wait');
  });

  test('General', async () => {
    await runTest(view, GeneralTest);
  });

  test('Event', async () => {
    await runTest(view, EventTest);
  });

  test('Output', async () => {
    await runTest(view, OutputTest);
  });

  test('Task', async () => {
    await runTest(
      view,
      new TaskTester({
        error: new RegExp(testee.processId),
        testOptions: { responsible: false, priority: false, expiry: false, options: undefined }
      })
    );
  });
});
