import { expect, Page } from '@playwright/test';
import { PartTest } from './part-tester';
import { CodeEditorUtil } from '../utils/code-editor-util';

export const CodeTest: PartTest = {
  partName: () => 'Code',
  fill: async (page: Page) => {
    await CodeEditorUtil.fill(page, 'ivy.log.info("hi");');
    await page.getByRole('checkbox').check();
  },
  assertFill: async (page: Page) => {
    await CodeEditorUtil.assertValue(page, 'ivy.log.info("hi");');
    await expect(page.getByRole('checkbox')).toBeChecked();
  },
  clear: async (page: Page) => {
    await CodeEditorUtil.focus(page);
    await CodeEditorUtil.clear(page);
    await page.getByRole('checkbox').uncheck();
  },
  assertClear: async (page: Page) => {
    await CodeEditorUtil.assertValue(page, '');
    await expect(page.getByRole('checkbox')).not.toBeChecked();
  }
};
