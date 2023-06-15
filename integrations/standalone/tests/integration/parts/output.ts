import { Page } from '@playwright/test';
import { PartTest } from './part-tester';
import { TableUtil } from '../../utils/table-util';
import { CodeEditorUtil } from '../../utils/code-editor-util';

export class OutputTester implements PartTest {
  constructor(private readonly hasCode: boolean = true) {}

  partName() {
    return 'Output';
  }
  async fill(page: Page) {
    await TableUtil.fillExpression(page, 1, '"bla"');
    if (this.hasCode) {
      await CodeEditorUtil.fill(page, 'ivy.log.info("hi");');
    }
  }
  async assertFill(page: Page) {
    await TableUtil.assertRow(page, 1, ['"bla"']);
    if (this.hasCode) {
      await CodeEditorUtil.assertValue(page, 'ivy.log.info("hi");');
    }
  }
  async clear(page: Page) {
    await TableUtil.fillExpression(page, 1, '');
    if (this.hasCode) {
      await CodeEditorUtil.focus(page);
      await CodeEditorUtil.clear(page);
    }
  }
  async assertClear(page: Page) {
    await TableUtil.assertRow(page, 1, ['']);
    if (this.hasCode) {
      await CodeEditorUtil.assertValue(page, '');
    }
  }
}

export const OutputTest = new OutputTester();
