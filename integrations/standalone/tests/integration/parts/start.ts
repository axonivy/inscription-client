import { expect } from '@playwright/test';
import { Part } from '../../pageobjects/Part';
import { CodeEditorUtil } from '../../utils/code-editor-util';
import { CollapseUtil } from '../../utils/collapse-util';
import { TableUtil } from '../../utils/table-util';
import { PartTest } from './part-tester';

export class StartTester implements PartTest {
  constructor(private readonly hideParamDesc: boolean = false) {}

  partName() {
    return 'Start';
  }
  async fill({ page }: Part) {
    await page.getByLabel('Signature').fill('myStart');
    await CollapseUtil.open(page, 'Input parameters');
    await TableUtil.addRow(page);
    if (this.hideParamDesc) {
      await TableUtil.fillRow(page, 0, ['param', 'String']);
    } else {
      await TableUtil.fillRow(page, 0, ['param', 'String', 'desc']);
    }
    await TableUtil.fillExpression(page, 1, '"bla"');
    await CodeEditorUtil.fill(page, 'ivy.log.info("hi");');
  }
  async assertFill({ page }: Part) {
    await expect(page.getByLabel('Signature')).toHaveValue('myStart');
    await CollapseUtil.open(page, 'Input parameters');
    if (this.hideParamDesc) {
      await TableUtil.assertRow(page, 0, ['param', 'String']);
    } else {
      await TableUtil.assertRow(page, 0, ['param', 'String', 'desc']);
    }
    await TableUtil.assertRow(page, 1, ['"bla"']);
    await CodeEditorUtil.assertValue(page, 'ivy.log.info("hi");');
  }
  async clear({ page }: Part) {
    await page.getByLabel('Signature').clear();
    await CollapseUtil.open(page, 'Input parameters');
    await TableUtil.removeRow(page, 0);
    await TableUtil.fillExpression(page, 0, '');
    await CodeEditorUtil.focus(page);
    await CodeEditorUtil.clear(page);
  }
  async assertClear({ page }: Part) {
    await expect(page.getByLabel('Signature')).toBeEmpty();
    await CollapseUtil.open(page, 'Input parameters');
    await TableUtil.assertEmpty(page, 0);
    await TableUtil.assertRow(page, 1, ['']);
    await CodeEditorUtil.assertValue(page, '');
  }
}

export const StartTest = new StartTester();
