import { Page } from '@playwright/test';
import { PartTest } from './part-tester';
import { TableUtil } from '../utils/table-util';

export class ConditionTester implements PartTest {
  partName() {
    return 'Condition';
  }
  async fill(page: Page) {
    await TableUtil.fillExpression(page, 1, '"bla"');
    const rows = page.locator('.dnd-row');
    await rows.first().locator('.dnd-row-handle').dragTo(rows.last().locator('.dnd-row-handle'));
  }
  async assertFill(page: Page) {
    await TableUtil.assertRow(page, 0, ['"bla"']);
    await TableUtil.assertRow(page, 1, ['false']);
  }
  async clear(page: Page) {
    await TableUtil.fillExpression(page, 0, '');
    const rows = page.locator('.dnd-row');
    await rows.first().locator('.dnd-row-handle').dragTo(rows.last().locator('.dnd-row-handle'));
  }
  async assertClear(page: Page) {
    await TableUtil.assertRow(page, 0, ['false']);
    await TableUtil.assertRow(page, 1, ['']);
  }
}

export const ConditionTest = new ConditionTester();
