import { expect } from '@playwright/test';
import { CodeEditorUtil } from '../../utils/code-editor-util';
import { PartTest } from './part-tester';
import { Part } from '../../pageobjects/Part';

export const CodeTest: PartTest = {
  partName: () => 'Code',
  fill: async ({ page }: Part) => {
    await CodeEditorUtil.fill(page, 'ivy.log.info("hi");');
    await page.getByRole('checkbox').check();
  },
  assertFill: async ({ page }: Part) => {
    await CodeEditorUtil.assertValue(page, 'ivy.log.info("hi");');
    await expect(page.getByRole('checkbox')).toBeChecked();
  },
  clear: async ({ page }: Part) => {
    await CodeEditorUtil.focus(page);
    await CodeEditorUtil.clear(page);
    await page.getByRole('checkbox').uncheck();
  },
  assertClear: async ({ page }: Part) => {
    await CodeEditorUtil.assertValue(page, '');
    await expect(page.getByRole('checkbox')).not.toBeChecked();
  }
};
