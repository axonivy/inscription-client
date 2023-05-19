import { test, expect } from '@playwright/test';
import { inscriptionView } from '../../utils/engine-util';
import { EndPageTest, NameTest, NameTestWithoutTags, fillReloadAndAssert } from '../parts';

test.describe('End Events', () => {
  test('End', async ({ page }) => {
    await page.goto(inscriptionView('169A4921D0EF0B91-f11'));
    await expect(page.getByText('End').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest]);
  });

  test('End Page', async ({ page }) => {
    await page.goto(inscriptionView('169A4921D0EF0B91-f12'));
    await expect(page.getByText('End Page').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest, EndPageTest]);
  });

  test('Error End', async ({ page }) => {
    await page.goto(inscriptionView('169A4921D0EF0B91-f13'));
    await expect(page.getByText('Error End').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest]);
  });

  test('Embedded End', async ({ page }) => {
    await page.goto(inscriptionView('0169A49845D37011-S10-g1'));
    await expect(page.getByText('Embedded End').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTestWithoutTags]);
  });

  test('Sub End', async ({ page }) => {
    await page.goto(inscriptionView('169A4A2A4DC8B908-f1'));
    await expect(page.getByText('Sub End').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest]);
  });

  test('WS End', async ({ page }) => {
    await page.goto(inscriptionView('169A4A3BFDC7DFFE-ws1'));
    await expect(page.getByText('WS End').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest]);
  });

  test('Process End', async ({ page }) => {
    await page.goto(inscriptionView('167356B1245C7158-f1'));
    await expect(page.getByText('Process End').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest]);
  });

  test('Exit End', async ({ page }) => {
    await page.goto(inscriptionView('167356B1245C7158-f4'));
    await expect(page.getByText('Exit End').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest]);
  });
});
