import { expect, test } from '@playwright/test';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import type { CreateProcessResult} from '../../../glsp-protocol';
import { createProcess } from '../../../glsp-protocol';

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
    await expect(view.page.locator('.no-editor')).toHaveText('No Editor found for type: ThirdPartyProgramInterface');
  });
});
