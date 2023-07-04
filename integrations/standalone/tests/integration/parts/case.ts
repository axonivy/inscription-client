import { Page, expect } from '@playwright/test';
import { PartTest } from './part-tester';
import { TableUtil } from '../../utils/table-util';
import { CollapseUtil } from '../../utils/collapse-util';
import { FocusCodeEditorUtil } from '../../utils/code-editor-util';

export const CaseTest: PartTest = {
  partName: () => 'Case',
  fill: async (page: Page) => {
    await FocusCodeEditorUtil.fill(page, page.getByRole('textbox', { name: 'Name' }), 'case name');
    await FocusCodeEditorUtil.fill(page, page.getByLabel('Description'), 'case desc');
    await FocusCodeEditorUtil.fill(page, page.getByLabel('Category'), 'case cat');

    await CollapseUtil.open(page, 'Custom Fields');
    await TableUtil.addRow(page);
    await TableUtil.fillRow(page, 0, ['cf', 'value']);
  },
  assertFill: async (page: Page) => {
    await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue('case name');
    await expect(page.getByLabel('Description')).toHaveValue('case desc');
    await expect(page.getByLabel('Category')).toHaveValue('case cat');
    await TableUtil.assertRow(page, 0, ['cf', 'value']);
  },
  clear: async (page: Page) => {
    await FocusCodeEditorUtil.clear(page, page.getByRole('textbox', { name: 'Name' }));
    await FocusCodeEditorUtil.clear(page, page.getByLabel('Description'));
    await FocusCodeEditorUtil.clear(page, page.getByLabel('Category'));
    await TableUtil.removeRow(page, 0);
  },
  assertClear: async (page: Page) => {
    await expect(page.getByRole('textbox', { name: 'Name' })).toBeEmpty();
    await expect(page.getByLabel('Description')).toBeEmpty();
    await expect(page.getByLabel('Category')).toBeEmpty();

    await CollapseUtil.assertClosed(page, 'Custom Fields');
  }
};
