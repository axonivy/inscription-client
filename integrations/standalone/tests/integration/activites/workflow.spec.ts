import { test } from '@playwright/test';
import { InscriptionView } from '../../pageobjects/InscriptionView';
import { CaseTest, CodeTest, DialogCallTest, NameTest, NameTestWithoutTags, OutputTest, OutputTester, SubCallTest, TaskTest, TriggerCallTest, fillReloadAndAssert } from '../parts';

test.describe('Workflow Activities', () => {
  test('User Task', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('0169A49845D37011-f4');
    await inscriptionView.expectHeaderText('User Task');
    await fillReloadAndAssert(inscriptionView, [NameTest, TaskTest, CaseTest, DialogCallTest, OutputTest]);
  });

  test('Dialog Call', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('0169A49845D37011-f2');
    await inscriptionView.expectHeaderText('User Dialog');
    await fillReloadAndAssert(inscriptionView, [NameTest, DialogCallTest, OutputTest]);
  });

  test('Script', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('0169A49845D37011-f5');
    await inscriptionView.expectHeaderText('Script');
    await fillReloadAndAssert(inscriptionView, [NameTest, new OutputTester(false), CodeTest]);
  });

  test('Embedded Sub', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('0169A49845D37011-S10');
    await inscriptionView.expectHeaderText('Sub');
    await fillReloadAndAssert(inscriptionView, [NameTestWithoutTags]);
  });

  test('Call Sub', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('0169A49845D37011-f19');
    await inscriptionView.expectHeaderText('Call');
    await fillReloadAndAssert(inscriptionView, [NameTest, SubCallTest, OutputTest]);
  });

  test('Trigger', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('0169A49845D37011-f21');
    await inscriptionView.expectHeaderText('Trigger');
    await fillReloadAndAssert(inscriptionView, [NameTest, TriggerCallTest, OutputTest]);
  });
});
