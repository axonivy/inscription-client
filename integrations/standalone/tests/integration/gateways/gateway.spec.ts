import { test, expect } from '@playwright/test';
import { inscriptionView } from '../../utils/engine-util';
import { fillReloadAndAssert, NameTest, CaseTest, OutputTest, TasksTest, EndPageTest } from '../parts';

test.describe('Gateways', () => {
  test('Alternative', async ({ page }) => {
    await page.goto(inscriptionView('169A4921D0EF0B91-f5'));
    await expect(page.getByText('Alternative').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest]);
  });

  test('Join', async ({ page }) => {
    await page.goto(inscriptionView('169A4921D0EF0B91-f7'));
    await expect(page.getByText('Join').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest, OutputTest]);
  });

  test('Split', async ({ page }) => {
    await page.goto(inscriptionView('169A4921D0EF0B91-f6'));
    await expect(page.getByText('Split').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest]);
  });

  test('Tasks', async ({ page }) => {
    await page.goto(inscriptionView('169A4921D0EF0B91-f8'));
    await expect(page.getByText('Tasks').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest, OutputTest, TasksTest, CaseTest, EndPageTest]);
  });
});
