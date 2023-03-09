import { Page, expect } from '@playwright/test';
import { TabTest } from './tab-tester';
import { TagUtil } from '../utils/tag-util';
import { TableUtil } from '../utils/table-util';

export class NameTabTester implements TabTest {
  constructor(private readonly hasTags: boolean = true) {}

  tabName() {
    return 'Name';
  }
  async fill(page: Page) {
    await page.getByLabel('Display name').fill('test name');
    await page.getByLabel('Description').fill('test desc');
    await TableUtil.addRow(page);
    await TableUtil.fillRow(page, 0, ['test doc', 'test url']);
    if (this.hasTags) {
      await TagUtil.addTags(page, ['abc', 'efg']);
    }
  }
  async assertFill(page: Page) {
    await expect(page.getByLabel('Display name')).toHaveValue('test name');
    await expect(page.getByLabel('Description')).toHaveValue('test desc');
    await TableUtil.assertRow(page, 0, ['test doc', 'test url']);
    if (this.hasTags) {
      await TagUtil.assertTags(page, ['abc', 'efg']);
    }
  }
  async clear(page: Page) {
    await page.getByLabel('Display name').clear();
    await page.getByLabel('Description').clear();
    await TableUtil.removeRow(page, 0);
    if (this.hasTags) {
      await TagUtil.clearTags(page, ['abc', 'efg']);
    }
  }
  async assertClear(page: Page) {
    await expect(page.getByLabel('Display name')).toBeEmpty();
    await expect(page.getByLabel('Description')).toBeEmpty();
    await TableUtil.assertEmpty(page);
    if (this.hasTags) {
      await TagUtil.assertEmpty(page);
    }
  }
}

export const NameTabTest = new NameTabTester();
export const NameTabTestWithoutTags = new NameTabTester(false);
