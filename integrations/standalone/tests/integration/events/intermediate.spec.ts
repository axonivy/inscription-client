import { test, expect } from '@playwright/test';
import { inscriptionView } from '../../utils/engine-util';
import { fillReloadAndAssert, NameTabTest, CaseTabTest, OutputTabTest, TaskTabTester } from '../tabs';
import { EndPageTabTest } from '../tabs/end-page-tab';

test.describe('Intermediate Events', () => {
  test('Task', async ({ page }) => {
    await page.goto(inscriptionView('169A4921D0EF0B91-f9'));
    await expect(page.getByText('Task').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTabTest, OutputTabTest, new TaskTabTester({ error: /EventAndGateway/ }), CaseTabTest, EndPageTabTest]);
  });

  test('Wait', async ({ page }) => {
    await page.goto(inscriptionView('169A4921D0EF0B91-f10'));
    await expect(page.getByText('Wait').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTabTest, OutputTabTest]);
  });
});
