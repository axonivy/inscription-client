import { test } from '../test';
import { MacroEditor, ScriptInput } from '../pageobjects/CodeEditor';
import { InscriptionView } from '../pageobjects/InscriptionView';

test.describe('Code Editor Input', () => {
  test('MacroInput - no new line', async ({ view }) => {
    await view.mock();
    const taskPart = view.accordion('Case');
    await taskPart.toggle();
    await assertNoNewLine(taskPart.macroInput('Name'));
  });

  test('ScriptInput - no new line', async ({ view }) => {
    await view.mock();
    const taskPart = view.accordion('Task');
    await taskPart.toggle();
    const expirySection = taskPart.section('Expiry');
    await expirySection.toggle();
    await assertNoNewLine(expirySection.scriptInput('Timeout'));
  });

  test('ScriptCell - enter accepts value', async ({ view }) => {
    await assertAcceptScriptCellValue(view, 'Enter');
  });

  test('ScriptCell - tab accepts value', async ({ view }) => {
    await assertAcceptScriptCellValue(view, 'Tab');
  });

  test('ScriptCell - escape accepts value', async ({ view }) => {
    await assertAcceptScriptCellValue(view, 'Escape');
  });

  test('ScriptCell - close popup accepts value', async ({ view }) => {
    await assertAcceptScriptCellValue(view);
  });

  async function assertNoNewLine(name: ScriptInput | MacroEditor) {
    await name.fill('test \nnewline');
    await name.expectValue('test newline');
  }

  async function assertAcceptScriptCellValue(view: InscriptionView, key?: string) {
    await view.mock();
    const taskPart = view.accordion('Output');
    await taskPart.toggle();
    const popover = view.popover();
    await popover.expectHidden();
    await taskPart.table(['label', 'label', 'expression']).row(1).column(2).edit('test');
    await popover.expectOpen();
    if (key) {
      await view.page.keyboard.press(key);
    } else {
      await popover.close();
    }
    await popover.expectHidden();

    await taskPart.toggle();
    await taskPart.toggle();
    await taskPart.table(['label', 'label', 'expression']).row(1).column(2).expectValue('test');
  }
});
