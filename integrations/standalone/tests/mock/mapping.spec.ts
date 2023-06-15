import { test, expect } from '@playwright/test';
import { AccordionUtil } from '../utils/accordion-util';
import { CollapseUtil } from '../utils/collapse-util';
import { TableUtil } from '../utils/table-util';
import { selectDialog } from './combobox-util';

test.describe('Mappings', () => {
  test('DialogCall change will update mapping tree', async ({ page }) => {
    await page.goto('mock.html');
    await page.getByRole('button', { name: 'Call' }).click();

    await selectDialog(page, 'AcceptRequest');
    await expect(page.getByRole('row')).toHaveCount(12);

    await selectDialog(page, 'test1');
    await expect(page.getByRole('row')).toHaveCount(4);
  });

  test('SubStart result param change will update mapping tree', async ({ page }) => {
    await page.goto('mock.html?type=CallSubStart');
    await AccordionUtil.toggle(page, 'Result');

    await CollapseUtil.open(page, 'Result parameters');
    await TableUtil.assertEmpty(page, 0);
    await TableUtil.assertRowCount(page, 1, 1);

    await TableUtil.addRow(page);
    await TableUtil.assertRowCount(page, 2, 1);

    await TableUtil.removeRow(page, 0);
    await TableUtil.assertRowCount(page, 1, 1);
  });
});
