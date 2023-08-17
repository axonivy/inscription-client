import { test } from '@playwright/test';
import { InscriptionView } from '../../pageobjects/InscriptionView';
import { CaseTest, EndPageTest, NameTest, OutputTest, TaskTester, fillReloadAndAssert } from '../parts';

test.describe('Intermediate Events', () => {
  test('Task', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    const { processId } = await inscriptionView.type('TaskSwitchEvent', { additionalElements: ['ErrorStartEvent'] });
    await inscriptionView.expectHeaderText('Task');
    await fillReloadAndAssert(inscriptionView, [NameTest, OutputTest, new TaskTester({ error: new RegExp(processId) }), CaseTest, EndPageTest]);
  });

  test('Wait', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    const { processId } = await inscriptionView.type('WaitEvent', { additionalElements: ['ErrorStartEvent'] });
    await inscriptionView.expectHeaderText('Wait');
    await fillReloadAndAssert(inscriptionView, [
      NameTest,
      new TaskTester({
        error: new RegExp(processId),
        testOptions: { responsible: false, priority: false, expiry: false, options: undefined }
      }),
      OutputTest
    ]);
  });
});
