import { test } from '@playwright/test';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import { CaseTest, NameTest, ResultTest, StartTest, WebServiceTest, WsStartTaskTest, runTest } from '../../parts';
import { CreateProcessResult, createProcess } from '../../../glsp-protocol';

test.describe('WS Start', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('WebserviceStart');
  });

  test.beforeEach(async ({ page }) => {
    view = new InscriptionView(page);
    await view.selectElement(testee.elementId);
  });

  test('Header', async () => {
    await view.expectHeaderText('WS Start');
  });

  test('Name', async () => {
    await runTest(view, NameTest);
  });

  test('Start', async () => {
    await runTest(view, StartTest);
  });

  test('Result', async () => {
    await runTest(view, ResultTest);
  });

  test('WebService', async () => {
    await runTest(view, WebServiceTest);
  });

  test('Task', async () => {
    await runTest(view, WsStartTaskTest);
  });

  test('Case', async () => {
    await runTest(view, CaseTest);
  });
});
