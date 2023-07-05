import { Part } from '../../pageobjects/Part';
import { TableUtil } from '../../utils/table-util';
import { PartTest } from './part-tester';

export class ConditionTester implements PartTest {
  partName() {
    return 'Condition';
  }
  async fill({ page }: Part) {
    await TableUtil.fillExpression(page, 1, '"bla"');
    const rows = page.locator('.dnd-row');
    await rows.first().locator('.dnd-row-handle').dragTo(rows.last().locator('.dnd-row-handle'));
  }
  async assertFill({ page }: Part) {
    await TableUtil.assertRow(page, 0, ['"bla"']);
    await TableUtil.assertRow(page, 1, ['false']);
  }
  async clear({ page }: Part) {
    await TableUtil.fillExpression(page, 0, '');
    const rows = page.locator('.dnd-row');
    await rows.first().locator('.dnd-row-handle').dragTo(rows.last().locator('.dnd-row-handle'));
  }
  async assertClear({ page }: Part) {
    await TableUtil.assertRow(page, 0, ['false']);
    await TableUtil.assertRow(page, 1, ['']);
  }
}

export const ConditionTest = new ConditionTester();
