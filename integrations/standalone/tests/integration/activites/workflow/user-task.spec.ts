import { test } from '@playwright/test';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import { CaseTest, DialogCallTest, NameTest, TaskTester, runTest, OutputTest } from '../../parts';
import { CreateProcessResult, createProcess } from '../../../glsp-protocol';

test.describe('User Task', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('UserTask', { additionalElements: ['ErrorStartEvent'] });
  });

  test.beforeEach(async ({ page }) => {
    view = await InscriptionView.selectElement(page, testee.elementId);
  });

  test('Header', async () => {
    await view.expectHeaderText('User Task');
  });

  test('Name', async () => {
    await runTest(view, NameTest);
  });

  test('Task', async () => {
    await runTest(view, new TaskTester({ error: new RegExp(testee.processId) }));
  });

  test('Case', async () => {
    await runTest(view, CaseTest);
  });

  test('DialogCall', async () => {
    await runTest(view, DialogCallTest);
  });

  test('Output', async () => {
    await runTest(view, OutputTest);
  });
});
