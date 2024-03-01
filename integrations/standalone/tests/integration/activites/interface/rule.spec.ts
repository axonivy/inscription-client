import { test } from '@playwright/test';
import { GeneralTest, runTest } from '../../parts';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import type { CreateProcessResult } from '../../../glsp-protocol';
import { createProcess } from '../../../glsp-protocol';
import { RuleInterfaceStartTest } from '../../parts/program-interface-start';

test.describe('Rule', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('ThirdPartyProgramInterface:RuleActivity');
  });

  test.beforeEach(async ({ page }) => {
    view = await InscriptionView.selectElement(page, testee.elementId);
  });

  test('Header', async () => {
    await view.expectHeaderText('Rule');
  });

  test('General', async () => {
    await runTest(view, GeneralTest);
  });

  test('Start', async () => {
    await runTest(view, RuleInterfaceStartTest);
  });
});
