import { test } from '@playwright/test';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import { CaseTest, NameTest, RequestTest, StartTest, TaskTester, TriggerTest, runTest } from '../../parts';
import { CreateProcessResult, createProcess } from '../../../glsp-protocol';

test.describe('StartRequest', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('RequestStart', { additionalElements: ['ErrorStartEvent'] });
  });

  test.beforeEach(async ({ page }) => {
    view = new InscriptionView(page);
    await view.selectElement(testee.elementId);
  });

  test('Header', async () => {
    await view.expectHeaderText('Start');
  });

  test('Name', async () => {
    await runTest(view, NameTest);
  });

  test('Start', async () => {
    await runTest(view, StartTest);
  });

  test('Request', async () => {
    await runTest(view, RequestTest);
  });

  test('Trigger', async () => {
    await runTest(view, TriggerTest);
  });

  test('Task', async () => {
    const request = view.accordion('Request');
    await request.toggle();
    const permissions = request.section('Permission');
    await permissions.toggle();
    await permissions.checkbox('Anonymous').click();

    await runTest(
      view,
      new TaskTester({
        error: new RegExp(testee.processId),
        testOptions: { responsible: false, priority: true, expiry: true, options: 'persist' }
      })
    );
  });

  test('Case', async () => {
    await runTest(view, CaseTest);
  });
});
