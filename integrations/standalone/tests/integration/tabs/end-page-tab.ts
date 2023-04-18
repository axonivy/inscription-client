import { Page, expect } from '@playwright/test';
import { TabTest } from './tab-tester';

export class EndPageTabTester implements TabTest {
  tabName() {
    return 'End Page';
  }
  async fill(page: Page) {
    await page.getByLabel('Display the following page').fill('page.xhtml');
  }
  async assertFill(page: Page) {
    await expect(page.getByLabel('Display the following page')).toHaveValue('page.xhtml');
  }
  async clear(page: Page) {
    await page.getByLabel('Display the following page').clear();
  }
  async assertClear(page: Page) {
    await expect(page.getByLabel('Display the following page')).toBeEmpty();
  }
}

export const EndPageTabTest = new EndPageTabTester();
