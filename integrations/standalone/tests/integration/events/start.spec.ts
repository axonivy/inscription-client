import { test, expect } from '@playwright/test';
import { inscriptionView } from '../../utils/engine-util';
import { CaseTest, NameTest, NameTestWithoutTags, OutputTest, fillReloadAndAssert } from '../parts';
import { StartTest, StartTester } from '../parts/start';
import { ErrorCatchTest } from '../parts/error-catch';
import { SignalCatchTest } from '../parts/signal-catch';
import { ResultTest, ResultTester } from '../parts/result';

test.describe('Start Events', () => {
  test('Start', async ({ page }) => {
    await page.goto(inscriptionView('169A4921D0EF0B91-f15'));
    await expect(page.getByText('Start').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest, StartTest]);
  });

  test('Signal Start', async ({ page }) => {
    await page.goto(inscriptionView('169A4921D0EF0B91-f4'));
    await expect(page.getByText('Signal Start').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest, SignalCatchTest, OutputTest]);
  });

  test('Error Start', async ({ page }) => {
    await page.goto(inscriptionView('169A4921D0EF0B91-f3'));
    await expect(page.getByText('Error Start').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest, ErrorCatchTest, OutputTest]);
  });

  test('Program Start', async ({ page }) => {
    await page.goto(inscriptionView('169A4921D0EF0B91-f2'));
    await expect(page.getByText('Program Start').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest]);
  });

  test('Embedded Start', async ({ page }) => {
    await page.goto(inscriptionView('0169A49845D37011-S10-g0'));
    await expect(page.getByText('Embedded Start').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTestWithoutTags]);
  });

  test('Sub Start', async ({ page }) => {
    await page.goto(inscriptionView('169A4A2A4DC8B908-f0'));
    await expect(page.getByText('Sub Start').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest, StartTest, ResultTest]);
  });

  test('WS Start', async ({ page }) => {
    await page.goto(inscriptionView('169A4A3BFDC7DFFE-ws0'));
    await expect(page.getByText('WS Start').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest, StartTest, ResultTest, CaseTest]);
  });

  test('Init Start', async ({ page }) => {
    await page.goto(inscriptionView('167356B1245C7158-f0'));
    await expect(page.getByText('Init Start').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest, StartTest, ResultTest]);
  });

  test('Method Start', async ({ page }) => {
    await page.goto(inscriptionView('167356B1245C7158-f6'));
    await expect(page.getByText('Method Start').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest, new StartTester(true), new ResultTester(true)]);
  });

  test('Event Start', async ({ page }) => {
    await page.goto(inscriptionView('167356B1245C7158-f3'));
    await expect(page.getByText('Event Start').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest, OutputTest]);
  });
});
