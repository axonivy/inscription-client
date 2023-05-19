import { Page, expect } from '@playwright/test';
import { PartTest } from './part-tester';
import { TableUtil } from '../utils/table-util';
import { CollapseUtil } from '../utils/collapse-util';

export const CaseTest: PartTest = {
  partName: () => 'Case',
  fill: async (page: Page) => {
    await page.getByRole('textbox', { name: 'Name' }).fill('test name');
    await page.getByLabel('Description').fill('test desc');
    await page.getByLabel('Category').fill('test cat');

    await CollapseUtil.open(page, 'Custom Fields');
    await TableUtil.addRow(page);
    await TableUtil.fillRow(page, 0, ['cf', 'value']);
  },
  assertFill: async (page: Page) => {
    await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue('test name');
    await expect(page.getByLabel('Description')).toHaveValue('test desc');
    await expect(page.getByLabel('Category')).toHaveValue('test cat');
    await TableUtil.assertRow(page, 0, ['cf', 'value']);
  },
  clear: async (page: Page) => {
    await page.getByRole('textbox', { name: 'Name' }).clear();
    await page.getByLabel('Description').clear();
    await page.getByLabel('Category').clear();
    await TableUtil.removeRow(page, 0);
  },
  assertClear: async (page: Page) => {
    await expect(page.getByRole('textbox', { name: 'Name' })).toBeEmpty();
    await expect(page.getByLabel('Description')).toBeEmpty();
    await expect(page.getByLabel('Category')).toBeEmpty();

    await CollapseUtil.assertClosed(page, 'Custom Fields');
  }
};
