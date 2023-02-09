import { test, expect } from '@playwright/test';
import { inscriptionView } from '../../utils/engine-util';
import { CallTabTest } from '../tabs/call-tab';
import { NameTabTest, NameTabTester } from '../tabs/name-tab';
import { OutputTabTest, OutputTabTester } from '../tabs/output-tab';
import { fillReloadAndAssert } from '../tabs/tab-tester';
import { CodeTabTest } from '../tabs/code-tab';
import { CaseTabTest } from '../tabs/case-tab';
import { TaskTabTest } from '../tabs/task-tab';

test.describe('Workflow Activities', () => {
  test('User Task', async ({ page }) => {
    await page.goto(inscriptionView('0169A49845D37011-f4'));
    await expect(page.getByText('User Task').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTabTest, TaskTabTest, CaseTabTest, CallTabTest, OutputTabTest]);
  });

  test('Dialog Call', async ({ page }) => {
    await page.goto(inscriptionView('0169A49845D37011-f2'));
    await expect(page.getByText('User Dialog').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTabTest, CallTabTest, OutputTabTest]);
  });

  test('Script', async ({ page }) => {
    await page.goto(inscriptionView('0169A49845D37011-f5'));
    await expect(page.getByText('Script').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTabTest, new OutputTabTester(false), CodeTabTest]);
  });

  test('Embedded Sub', async ({ page }) => {
    await page.goto(inscriptionView('0169A49845D37011-S10'));
    await expect(page.getByText('Sub').first()).toBeVisible();
    await fillReloadAndAssert(page, [new NameTabTester(false)]);
  });

  test('Call Sub', async ({ page }) => {
    await page.goto(inscriptionView('0169A49845D37011-f19'));
    await expect(page.getByText('Call').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTabTest]);
  });

  test('Trigger', async ({ page }) => {
    await page.goto(inscriptionView('0169A49845D37011-f21'));
    await expect(page.getByText('Trigger').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTabTest]);
  });
});
