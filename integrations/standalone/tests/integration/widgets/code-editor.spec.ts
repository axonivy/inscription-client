import { test } from '@playwright/test';
import { InscriptionView } from '../../pageobjects/InscriptionView';

test.describe('Code Editor', () => {
  test('MacroInput', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A4921D0EF0B91-f9');
    const taskPart = inscriptionView.accordion('Task');
    await taskPart.toggle();
    const name = taskPart.macroInput('Name');
    await name.triggerContentAssist();
    await name.expectContentAssistContains('Insert Macro');
  });

  test('MacroArea', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A4921D0EF0B91-f9');
    const taskPart = inscriptionView.accordion('Task');
    await taskPart.toggle();
    const description = taskPart.macroArea('Description');
    await description.triggerContentAssist();
    await description.expectContentAssistContains('Insert Macro');
  });

  test('ScriptArea', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A4921D0EF0B91-f9');
    const taskPart = inscriptionView.accordion('Task');
    await taskPart.toggle();
    const codeSection = taskPart.section('Code');
    await codeSection.toggle();
    const code = codeSection.scriptArea();
    await code.triggerContentAssist();
    await code.expectContentAssistContains('in1');
  });

  test('ScriptInput', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A4921D0EF0B91-f9');
    const taskPart = inscriptionView.accordion('Task');
    await taskPart.toggle();
    const expirySection = taskPart.section('Expiry');
    await expirySection.toggle();
    const timeout = expirySection.scriptInput('Timeout');
    await timeout.triggerContentAssist();
    await timeout.expectContentAssistContains('in1');
  });
});
