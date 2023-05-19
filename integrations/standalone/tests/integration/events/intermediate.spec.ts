import { test, expect } from '@playwright/test';
import { inscriptionView } from '../../utils/engine-util';
import { CaseTest, EndPageTest, NameTest, OutputTest, TaskTester, fillReloadAndAssert } from '../parts';

test.describe('Intermediate Events', () => {
  test('Task', async ({ page }) => {
    await page.goto(inscriptionView('169A4921D0EF0B91-f9'));
    await expect(page.getByText('Task').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest, OutputTest, new TaskTester({ error: /EventAndGateway/ }), CaseTest, EndPageTest]);
  });

  test('Wait', async ({ page }) => {
    await page.goto(inscriptionView('169A4921D0EF0B91-f10'));
    await expect(page.getByText('Wait').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest, OutputTest]);
  });
});
