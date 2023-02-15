import { Page, expect } from '@playwright/test';
import { TabTest } from './tab-tester';
import { SelectUtil } from '../utils/select-util';
import { CollapseUtil } from '../utils/collapse-util';
import { CodeEditorUtil } from '../utils/code-editor-util';
import { TableUtil } from '../utils/table-util';

export const TaskTabTest: TabTest = {
  tabName: () => 'Task',
  fill: async (page: Page) => {
    await page.getByRole('textbox', { name: 'Name' }).fill('test name');
    await page.getByLabel('Description').fill('test desc');
    await page.getByLabel('Category').fill('test cat');

    await SelectUtil.select(page, 'Role from Attr.', 0);
    await page.getByRole('textbox', { name: 'activator' }).fill('"Teamleader"');

    await SelectUtil.select(page, 'High', 1);

    await CollapseUtil.open(page, 'Options');
    await page.getByRole('checkbox').check();
    await page.getByLabel('Delay').fill('delay');

    await CollapseUtil.open(page, 'Expiry');
    await page.getByLabel('Timeout').fill('timeout');
    await SelectUtil.select(page, 'f8', 2);
    await SelectUtil.select(page, 'Nobody & delete', 3);
    await SelectUtil.select(page, 'Low', 4);

    await CollapseUtil.open(page, 'Custom Fields');
    await TableUtil.addRow(page);
    await TableUtil.fillRow(page, 0, ['cf', 'value']);

    await CollapseUtil.open(page, 'Code');
    await CodeEditorUtil.fill(page, 'code');
  },
  assertFill: async (page: Page) => {
    await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue('test name');
    await expect(page.getByLabel('Description')).toHaveValue('test desc');
    await expect(page.getByLabel('Category')).toHaveValue('test cat');

    await SelectUtil.assertSelect(page, /Role from/, 0);
    await expect(page.getByRole('textbox', { name: 'activator' })).toHaveValue('"Teamleader"');

    await SelectUtil.assertSelect(page, /High/, 1);

    await expect(page.getByRole('checkbox')).toBeChecked();
    await expect(page.getByLabel('Delay')).toHaveValue('delay');

    await page.getByLabel('Timeout').fill('timeout');
    await SelectUtil.assertSelect(page, /f8/, 2);
    await SelectUtil.assertSelect(page, /Nobody/, 3);
    await SelectUtil.assertSelect(page, /Low/, 4);

    await TableUtil.assertRow(page, 0, ['cf', 'value']);

    await CodeEditorUtil.assertValue(page, 'code');
  },
  clear: async (page: Page) => {
    await page.getByRole('textbox', { name: 'Name' }).clear();
    await page.getByLabel('Description').clear();
    await page.getByLabel('Category').clear();

    await SelectUtil.select(page, 'Role', 0);

    await SelectUtil.select(page, 'Normal', 2);
    await page.getByRole('checkbox').uncheck();
    await page.getByLabel('Delay').clear();

    await page.getByLabel('Timeout').clear();

    await TableUtil.removeRow(page, 0);

    await CodeEditorUtil.clear(page);
  },
  assertClear: async (page: Page) => {
    await expect(page.getByRole('textbox', { name: 'Name' })).toBeEmpty();
    await expect(page.getByLabel('Description')).toBeEmpty();
    await expect(page.getByLabel('Category')).toBeEmpty();

    await SelectUtil.assertSelect(page, /Role/, 0);
    await SelectUtil.assertSelect(page, /Everybody/, 1);
    await SelectUtil.select(page, 'Normal', 2);

    await CollapseUtil.assertClosed(page, 'Options');
    await CollapseUtil.assertClosed(page, 'Expiry');
    await CollapseUtil.assertClosed(page, 'Custom Fields');
    await CollapseUtil.assertClosed(page, 'Code');
  }
};
