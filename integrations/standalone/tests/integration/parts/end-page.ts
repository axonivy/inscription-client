import { expect } from '@playwright/test';
import { Part } from '../../pageobjects/Part';
import { PartTest } from './part-tester';

export class EndPageTester implements PartTest {
  partName() {
    return 'End Page';
  }
  async fill({ page }: Part) {
    await page.getByLabel('Display the following page').fill('page.xhtml');
  }
  async assertFill({ page }: Part) {
    await expect(page.getByLabel('Display the following page')).toHaveValue('page.xhtml');
  }
  async clear({ page }: Part) {
    await page.getByLabel('Display the following page').clear();
  }
  async assertClear({ page }: Part) {
    await expect(page.getByLabel('Display the following page')).toBeEmpty();
  }
}

export const EndPageTest = new EndPageTester();
