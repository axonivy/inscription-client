import { Part } from '../../pageobjects/Part';
import { CodeEditorUtil } from '../../utils/code-editor-util';
import { TableUtil } from '../../utils/table-util';
import { PartTest } from './part-tester';

export class OutputTester implements PartTest {
  constructor(private readonly hasCode: boolean = true) {}

  partName() {
    return 'Output';
  }
  async fill({ page }: Part) {
    await TableUtil.fillExpression(page, 1, '"bla"');
    if (this.hasCode) {
      await CodeEditorUtil.fill(page, 'ivy.log.info("hi");');
    }
  }
  async assertFill({ page }: Part) {
    await TableUtil.assertRow(page, 1, ['"bla"']);
    if (this.hasCode) {
      await CodeEditorUtil.assertValue(page, 'ivy.log.info("hi");');
    }
  }
  async clear({ page }: Part) {
    await TableUtil.fillExpression(page, 1, '');
    if (this.hasCode) {
      await CodeEditorUtil.focus(page);
      await CodeEditorUtil.clear(page);
    }
  }
  async assertClear({ page }: Part) {
    await TableUtil.assertRow(page, 1, ['']);
    if (this.hasCode) {
      await CodeEditorUtil.assertValue(page, '');
    }
  }
}

export const OutputTest = new OutputTester();
