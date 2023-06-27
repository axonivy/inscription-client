import { Page, expect } from '@playwright/test';
import { PartTest } from './part-tester';
import { SelectUtil } from '../utils/select-util';
import { CollapseUtil } from '../../utils/collapse-util';
import { CodeEditorUtil } from '../../utils/code-editor-util';
import { TableUtil } from '../../utils/table-util';
import { TabUtil } from '../utils/tab-util';

export class TasksTester implements PartTest {
  private tasks: { tab: string; test: PartTest }[];
  constructor(private readonly error: RegExp = /EventAndGateway/) {
    this.tasks = [
      { tab: 'TaskA', test: new TaskTester({ name: 'task1', error: this.error }) },
      { tab: 'TaskB', test: new TaskTester({ name: 'task2', error: this.error }) }
    ];
  }
  partName() {
    return 'Tasks';
  }
  async fill(page: Page) {
    for (const task of this.tasks) {
      await TabUtil.change(page, task.tab);
      await task.test.fill(page);
    }
  }
  async assertFill(page: Page) {
    for (const task of this.tasks) {
      await TabUtil.change(page, task.tab);
      await task.test.assertFill(page);
    }
  }
  async clear(page: Page) {
    for (const task of this.tasks) {
      await TabUtil.change(page, task.tab);
      await task.test.clear(page);
    }
  }
  async assertClear(page: Page) {
    for (const task of this.tasks) {
      await TabUtil.change(page, task.tab);
      await task.test.assertClear(page);
    }
  }
}

export class TaskTester implements PartTest {
  private name: string = 'test name';
  private error: RegExp = /f8/;
  constructor(options?: { name?: string; error?: RegExp }) {
    if (options?.name) {
      this.name = options.name;
    }
    if (options?.error) {
      this.error = options.error;
    }
  }

  partName() {
    return 'Task';
  }
  async fill(page: Page) {
    await CodeEditorUtil.fillById(page, 'taskName', this.name);
    await CodeEditorUtil.fillById(page, 'taskDescription', 'test desc');
    await CodeEditorUtil.fillById(page, 'taskCategory', 'test cat');

    await SelectUtil.select(page, 'Role from Attr.', 0);
    await page.getByRole('textbox', { name: 'activator' }).fill('"Teamleader"');

    await SelectUtil.select(page, 'High', 1);

    await CollapseUtil.open(page, 'Options');
    await page.getByRole('checkbox').check();
    await page.getByLabel('Delay').fill('delay');

    await CollapseUtil.open(page, 'Expiry');
    await page.getByLabel('Timeout').fill('timeout');
    await SelectUtil.select(page, this.error, 2);
    await SelectUtil.select(page, 'Nobody & delete', 3);
    await SelectUtil.select(page, 'Low', 4);

    await CollapseUtil.open(page, 'Custom Fields');
    await TableUtil.addRow(page);
    await TableUtil.fillRow(page, 0, ['cf', 'value']);

    await CollapseUtil.open(page, 'Code');
    await CodeEditorUtil.fillById(page, 'taskCode', 'code');
  }
  async assertFill(page: Page) {
    await CodeEditorUtil.assertValueById(page, 'taskName', this.name);
    await CodeEditorUtil.assertValueById(page, 'taskDescription', 'test desc');
    await CodeEditorUtil.assertValueById(page, 'taskCategory', 'test cat');

    await SelectUtil.assertSelect(page, /Role from/, 0);
    await expect(page.getByRole('textbox', { name: 'activator' })).toHaveValue('"Teamleader"');

    await SelectUtil.assertSelect(page, /High/, 1);

    await expect(page.getByRole('checkbox')).toBeChecked();
    await expect(page.getByLabel('Delay')).toHaveValue('delay');

    await page.getByLabel('Timeout').fill('timeout');
    await SelectUtil.assertSelect(page, this.error, 2);
    await SelectUtil.assertSelect(page, /Nobody/, 3);
    await SelectUtil.assertSelect(page, /Low/, 4);

    await TableUtil.assertRow(page, 0, ['cf', 'value']);

    await CodeEditorUtil.assertValueById(page, 'taskCode', 'code');
  }
  async clear(page: Page) {
    await CodeEditorUtil.clearById(page, 'taskName');
    await CodeEditorUtil.clearById(page, 'taskDescription');
    await CodeEditorUtil.clearById(page, 'taskCategory');

    await SelectUtil.select(page, 'Role', 0);

    await SelectUtil.select(page, 'Normal', 2);
    await page.getByRole('checkbox').uncheck();
    await page.getByLabel('Delay').clear();

    await page.getByLabel('Timeout').clear();

    await TableUtil.removeRow(page, 0);

    await CodeEditorUtil.clearById(page, 'taskCode');
  }
  async assertClear(page: Page) {
    await CodeEditorUtil.assertEmptyById(page, 'taskName');
    await CodeEditorUtil.assertEmptyById(page, 'taskDescription');
    await CodeEditorUtil.assertEmptyById(page, 'taskCategory');

    await SelectUtil.assertSelect(page, /Role/, 0);
    await SelectUtil.assertSelect(page, /Everybody/, 1);
    await SelectUtil.select(page, 'Normal', 2);

    await CollapseUtil.assertClosed(page, 'Options');
    await CollapseUtil.assertClosed(page, 'Expiry');
    await CollapseUtil.assertClosed(page, 'Custom Fields');
    await CollapseUtil.assertClosed(page, 'Code');
  }
}

export const TaskTest = new TaskTester();

export const TasksTest = new TasksTester();
