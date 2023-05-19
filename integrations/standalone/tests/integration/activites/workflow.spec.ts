import { test, expect } from '@playwright/test';
import { inscriptionView } from '../../utils/engine-util';
import { CaseTest, CodeTest, DialogCallTest, NameTest, NameTestWithoutTags, OutputTest, OutputTester, SubCallTest, TaskTest, TriggerCallTest, fillReloadAndAssert } from '../parts';

test.describe('Workflow Activities', () => {
  test('User Task', async ({ page }) => {
    await page.goto(inscriptionView('0169A49845D37011-f4'));
    await expect(page.getByText('User Task').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest, TaskTest, CaseTest, DialogCallTest, OutputTest]);
  });

  test('Dialog Call', async ({ page }) => {
    await page.goto(inscriptionView('0169A49845D37011-f2'));
    await expect(page.getByText('User Dialog').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest, DialogCallTest, OutputTest]);
  });

  test('Script', async ({ page }) => {
    await page.goto(inscriptionView('0169A49845D37011-f5'));
    await expect(page.getByText('Script').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest, new OutputTester(false), CodeTest]);
  });

  test('Embedded Sub', async ({ page }) => {
    await page.goto(inscriptionView('0169A49845D37011-S10'));
    await expect(page.getByText('Sub').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTestWithoutTags]);
  });

  test('Call Sub', async ({ page }) => {
    await page.goto(inscriptionView('0169A49845D37011-f19'));
    await expect(page.getByText('Call').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest, SubCallTest, OutputTest]);
  });

  test('Trigger', async ({ page }) => {
    await page.goto(inscriptionView('0169A49845D37011-f21'));
    await expect(page.getByText('Trigger').first()).toBeVisible();
    await fillReloadAndAssert(page, [NameTest, TriggerCallTest, OutputTest]);
  });
});
