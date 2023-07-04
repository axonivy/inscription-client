import { test, expect } from '@playwright/test';
import { inscriptionView } from '../../utils/engine-util';
import { AccordionUtil } from '../../utils/accordion-util';
import { CodeEditorUtil, FocusCodeEditorUtil } from '../../utils/code-editor-util';
import { CollapseUtil } from '../../utils/collapse-util';

test.describe('Widgets', () => {
  test('MacroInput', async ({ page }) => {
    await page.goto(inscriptionView('169A4921D0EF0B91-f9'));
    await expect(page.getByText('Task').first()).toBeVisible();
    await AccordionUtil.toggle(page, 'Task');
    await FocusCodeEditorUtil.triggerContentAssist(page, page.getByRole('textbox', { name: 'Name' }));
    await FocusCodeEditorUtil.assertContentAssist(page, 'Insert Macro');
  });

  test('MacroArea', async ({ page }) => {
    await page.goto(inscriptionView('169A4921D0EF0B91-f9'));
    await expect(page.getByText('Task').first()).toBeVisible();
    await AccordionUtil.toggle(page, 'Task');
    await FocusCodeEditorUtil.triggerContentAssist(page, page.getByLabel('Description'));
    await FocusCodeEditorUtil.assertContentAssist(page, 'Insert Macro');
  });

  test('ScriptArea', async ({ page }) => {
    await page.goto(inscriptionView('169A4921D0EF0B91-f9'));
    await expect(page.getByText('Task').first()).toBeVisible();
    await AccordionUtil.toggle(page, 'Task');
    await CollapseUtil.open(page, 'Code');
    await CodeEditorUtil.triggerContentAssist(page);
    await CodeEditorUtil.assertContentAssist(page, 'in1');
  });

  test('ScriptInput', async ({ page }) => {
    await page.goto(inscriptionView('169A4921D0EF0B91-f9'));
    await expect(page.getByText('Task').first()).toBeVisible();
    await AccordionUtil.toggle(page, 'Task');
    await CollapseUtil.open(page, 'Expiry');
    await FocusCodeEditorUtil.triggerContentAssist(page, page.getByLabel('Timeout'));
    await FocusCodeEditorUtil.assertContentAssist(page, 'in1');
  });
});
