import { Page, expect } from '@playwright/test';
import { PartTest } from './part-tester';
import { TableUtil } from '../utils/table-util';
import { CodeEditorUtil } from '../utils/code-editor-util';

export class StartTester implements PartTest {
  constructor(private readonly hideParamDesc: boolean = false) {}

  partName() {
    return 'Start';
  }
  async fill(page: Page) {
    await page.getByLabel('Signature').fill('myStart');
    await TableUtil.addRow(page);
    if (this.hideParamDesc) {
      await TableUtil.fillRow(page, 0, ['param', 'String']);
    } else {
      await TableUtil.fillRow(page, 0, ['param', 'String', 'desc']);
    }
    await TableUtil.fillExpression(page, 1, '"bla"');
    await CodeEditorUtil.fill(page, 'ivy.log.info("hi");');
  }
  async assertFill(page: Page) {
    await expect(page.getByLabel('Signature')).toHaveValue('myStart');
    if (this.hideParamDesc) {
      await TableUtil.assertRow(page, 0, ['param', 'String']);
    } else {
      await TableUtil.assertRow(page, 0, ['param', 'String', 'desc']);
    }
    await TableUtil.assertRow(page, 1, ['"bla"']);
    await CodeEditorUtil.assertValue(page, 'ivy.log.info("hi");');
  }
  async clear(page: Page) {
    await page.getByLabel('Signature').clear();
    await TableUtil.removeRow(page, 0);
    await TableUtil.fillExpression(page, 0, '');
    await CodeEditorUtil.focus(page);
    await CodeEditorUtil.clear(page);
  }
  async assertClear(page: Page) {
    await expect(page.getByLabel('Signature')).toBeEmpty();
    await TableUtil.assertEmpty(page, 0);
    await TableUtil.assertRow(page, 1, ['']);
    await CodeEditorUtil.assertValue(page, '');
  }
}

export const StartTest = new StartTester();
