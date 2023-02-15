import { Page } from '@playwright/test';
import { TabTest } from './tab-tester';
import { TableUtil } from '../utils/table-util';
import { CodeEditorUtil } from '../utils/code-editor-util';

export class OutputTabTester implements TabTest {
  constructor(private readonly hasCode: boolean = true) {}

  tabName() {
    return 'Output';
  }
  async fill(page: Page) {
    await TableUtil.fillExpression(page, 1, '"bla"');
    if (this.hasCode) {
      await CodeEditorUtil.fill(page, 'ivy.log.info("hi");');
    }
  }
  async assertFill(page: Page) {
    //FIXME output map is not always send to view: await TableUtil.assertRow(page, 1, ['"bla"']);
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

export const OutputTabTest = new OutputTabTester();
