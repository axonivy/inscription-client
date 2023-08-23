import { test } from '@playwright/test';
import { InscriptionView } from '../../pageobjects/InscriptionView';
import { CaseTest, EndPageTest, NameTest, OutputTest, TasksTester, runTest } from '../parts';
import { CreateProcessResult, createProcess } from '../../glsp-protocol';

test.describe('Tasks', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('TaskSwitchGateway', { connectTo: ['Script'], additionalElements: ['ErrorStartEvent'] });
  });

  test.beforeEach(async ({ page }) => {
    view = new InscriptionView(page);
    await view.selectElement(testee.elementId);
  });

  test('Header', async () => {
    await view.expectHeaderText('Tasks');
  });

  test('Name', async () => {
    await runTest(view, NameTest);
  });

  test('Output', async () => {
    await runTest(view, OutputTest);
  });

  test('Tasks', async () => {
    await runTest(view, new TasksTester(new RegExp(testee.processId)));
  });

  test('Case', async () => {
    await runTest(view, CaseTest);
  });

  test('EndPage', async () => {
    await runTest(view, EndPageTest);
  });
});
