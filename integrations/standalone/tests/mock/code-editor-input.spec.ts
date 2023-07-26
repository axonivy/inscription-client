import { Page, test } from '@playwright/test';
import { InscriptionView } from '../pageobjects/InscriptionView';
import { CodeEditor } from '../pageobjects/CodeEditor';

test.describe('Code Editor Input', () => {
  test('MacroInput - no new line', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.mock();
    const taskPart = inscriptionView.accordion('Case');
    await taskPart.toggle();
    await assertNoNewLine(page, taskPart.macroInput('Name'));
  });

  test('ScriptInput - no new line', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.mock();
    const taskPart = inscriptionView.accordion('Task');
    await taskPart.toggle();
    const expirySection = taskPart.section('Expiry');
    await expirySection.toggle();
    await assertNoNewLine(page, expirySection.scriptInput('Timeout'));
  });

  test('ScriptCell - enter accepts value', async ({ page }) => {
    await assertAcceptScriptCellValue(page, 'Enter');
  });

  test('ScriptCell - tab accepts value', async ({ page }) => {
    await assertAcceptScriptCellValue(page, 'Tab');
  });

  test('ScriptCell - escape accepts value', async ({ page }) => {
    await assertAcceptScriptCellValue(page, 'Escape');
  });

  test('ScriptCell - close popup accepts value', async ({ page }) => {
    await assertAcceptScriptCellValue(page);
  });

  async function assertNoNewLine(page: Page, name: CodeEditor) {
    await name.fill('test \nnewline');
    await page.keyboard.press('Tab');
    await name.expectValue('test newline');
  }

  async function assertAcceptScriptCellValue(page: Page, key?: string) {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.mock();
    const taskPart = inscriptionView.accordion('Output');
    await taskPart.toggle();
    const popover = inscriptionView.popover();
    await popover.expectHidden();
    await taskPart.table(['label', 'label', 'expression']).row(1).column(2).edit('test');
    await popover.expectOpen();
    if (key) {
      await page.keyboard.press(key);
    } else {
      await popover.close();
    }
    await popover.expectHidden();

    await taskPart.toggle();
    await taskPart.toggle();
    await taskPart.table(['label', 'label', 'expression']).row(1).column(2).expectValue('test');
  }
});
