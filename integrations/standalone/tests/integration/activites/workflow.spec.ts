import { test } from '@playwright/test';
import { InscriptionView } from '../../pageobjects/InscriptionView';
import {
  CaseTest,
  CodeTest,
  DialogCallTest,
  NameTest,
  NameTestWithoutTags,
  OutputTest,
  ScriptOutputTest,
  SubCallTest,
  TaskTester,
  TriggerCallTest,
  fillReloadAndAssert
} from '../parts';

test.describe('Workflow Activities', () => {
  test('User Task', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    const { processId } = await inscriptionView.type('UserTask', { additionalElements: ['ErrorStartEvent'] });
    await inscriptionView.expectHeaderText('User Task');
    await fillReloadAndAssert(inscriptionView, [NameTest, new TaskTester({ error: new RegExp(processId) }), CaseTest, DialogCallTest, OutputTest]);
  });

  test('Dialog Call', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.type('DialogCall');
    await inscriptionView.expectHeaderText('User Dialog');
    await fillReloadAndAssert(inscriptionView, [NameTest, DialogCallTest, OutputTest]);
  });

  test('Script', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.type('Script');
    await inscriptionView.expectHeaderText('Script');
    await fillReloadAndAssert(inscriptionView, [NameTest, ScriptOutputTest, CodeTest]);
  });

  test('Embedded Sub', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.type('EmbeddedProcessElement');
    await inscriptionView.expectHeaderText('Sub');
    await fillReloadAndAssert(inscriptionView, [NameTestWithoutTags]);
  });

  test('Call Sub', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.type('SubProcessCall');
    await inscriptionView.expectHeaderText('Call');
    await fillReloadAndAssert(inscriptionView, [NameTest, SubCallTest, OutputTest]);
  });

  test('Trigger', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.type('TriggerCall');
    await inscriptionView.expectHeaderText('Trigger');
    await fillReloadAndAssert(inscriptionView, [NameTest, TriggerCallTest, OutputTest]);
  });
});
