import { test, expect } from '@playwright/test';
import { inscriptionView } from '../../utils/engine-util';
import { NameTest, OutputTest, fillReloadAndAssert } from '../parts';

test.describe('Interface Activities', () => {
  test('Database', async ({ page }) => {
    await page.goto(inscriptionView('0169A49845D37011-f6'));
    await expect(page.getByText('Database').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest, OutputTest]);
  });

  test('WebService', async ({ page }) => {
    await page.goto(inscriptionView('0169A49845D37011-f12'));
    await expect(page.getByText('Web Service').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest]);
  });

  test('Rest Client', async ({ page }) => {
    await page.goto(inscriptionView('0169A49845D37011-f14'));
    await expect(page.getByText('Rest Client').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest]);
  });

  test('EMail', async ({ page }) => {
    await page.goto(inscriptionView('0169A49845D37011-f16'));
    await expect(page.getByText('E-Mail').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest]);
  });

  test('Rule', async ({ page }) => {
    await page.goto(inscriptionView('0169A49845D37011-f7'));
    await expect(page.locator('.no-editor')).toHaveText('No Editor found for type: ThirdPartyProgramInterface');
  });

  test('Program', async ({ page }) => {
    await page.goto(inscriptionView('0169A49845D37011-f23'));
    await expect(page.getByText('Program').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest]);
  });
});
