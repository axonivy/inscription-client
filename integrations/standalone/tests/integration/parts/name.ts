import { expect } from '@playwright/test';
import { Part } from '../../pageobjects/Part';
import { CollapseUtil } from '../../utils/collapse-util';
import { TableUtil } from '../../utils/table-util';
import { TagUtil } from '../../utils/tag-util';
import { PartTest } from './part-tester';

export class NameTester implements PartTest {
  constructor(private readonly hasTags: boolean = true) {}

  partName() {
    return 'Name';
  }
  async fill({ page }: Part) {
    await page.getByLabel('Display name').fill('test name');
    await page.getByLabel('Description').fill('test desc');
    await CollapseUtil.open(page, 'Means / Documents');
    await TableUtil.addRow(page);
    await TableUtil.fillRow(page, 0, ['test doc', 'test url']);
    if (this.hasTags) {
      await TagUtil.addTags(page, ['abc', 'efg']);
    }
  }
  async assertFill({ page }: Part) {
    await expect(page.getByLabel('Display name')).toHaveValue('test name');
    await expect(page.getByLabel('Description')).toHaveValue('test desc');
    await TableUtil.assertRow(page, 0, ['test doc', 'test url']);
    if (this.hasTags) {
      await TagUtil.assertTags(page, ['abc', 'efg']);
    }
  }
  async clear({ page }: Part) {
    await page.getByLabel('Display name').clear();
    await page.getByLabel('Description').clear();
    await TableUtil.removeRow(page, 0);
    if (this.hasTags) {
      await TagUtil.clearTags(page, ['abc', 'efg']);
    }
  }
  async assertClear({ page }: Part) {
    await expect(page.getByLabel('Display name')).toBeEmpty();
    await expect(page.getByLabel('Description')).toBeEmpty();
    await CollapseUtil.assertClosed(page, 'Means / Documents');
    if (this.hasTags) {
      await TagUtil.assertEmpty(page);
    }
  }
}

export const NameTest = new NameTester();
export const NameTestWithoutTags = new NameTester(false);
