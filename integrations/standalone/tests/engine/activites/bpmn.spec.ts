import { test, expect } from '@playwright/test';
import { inscriptionView } from '../../utils/engine-util';
import { NameTabTester } from '../tabs/name-tab';
import { fillReloadAndAssert } from '../tabs/tab-tester';

test.describe('BPMN Activities', () => {
  test('Generic', async ({ page }) => {
    await page.goto(inscriptionView('169A49F1790F4A32-G10'));
    await expect(page.getByText('Generic').first()).toBeVisible();
    await fillReloadAndAssert(page, [new NameTabTester(false)]);
  });

  test('User', async ({ page }) => {
    await page.goto(inscriptionView('169A49F1790F4A32-U20'));
    await expect(page.getByText('User').first()).toBeVisible();
  });

  test('Manual', async ({ page }) => {
    await page.goto(inscriptionView('169A49F1790F4A32-M30'));
    await expect(page.getByText('Manual').first()).toBeVisible();
  });

  test('Script', async ({ page }) => {
    await page.goto(inscriptionView('169A49F1790F4A32-S80'));
    await expect(page.getByText('Script').first()).toBeVisible();
  });

  test('Service', async ({ page }) => {
    await page.goto(inscriptionView('169A49F1790F4A32-S70'));
    await expect(page.getByText('Service').first()).toBeVisible();
  });

  test('Rule', async ({ page }) => {
    await page.goto(inscriptionView('169A49F1790F4A32-R50'));
    await expect(page.getByText('Rule').first()).toBeVisible();
  });

  test('Receive', async ({ page }) => {
    await page.goto(inscriptionView('169A49F1790F4A32-R40'));
    await expect(page.getByText('Receive').first()).toBeVisible();
  });

  test('Send', async ({ page }) => {
    await page.goto(inscriptionView('169A49F1790F4A32-S60'));
    await expect(page.getByText('Send').first()).toBeVisible();
  });
});
