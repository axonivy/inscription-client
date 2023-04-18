import { Page } from '@playwright/test';
import { TabUtil } from '../../utils/tab-util';

export interface TabTest {
  tabName: () => string;
  fill: (page: Page) => Promise<void>;
  assertFill: (page: Page) => Promise<void>;
  clear: (page: Page) => Promise<void>;
  assertClear: (page: Page) => Promise<void>;
}

export async function fillReloadAndAssert(page: Page, tests: TabTest[]) {
  for (const test of tests) {
    await TabUtil.change(page, test.tabName());
    await test.fill(page);
  }
  await page.reload();
  for (const test of tests) {
    await TabUtil.change(page, test.tabName());
    await test.assertFill(page);
  }
  for (const test of tests) {
    await TabUtil.change(page, test.tabName());
    await test.clear(page);
  }
  await page.reload();
  for (const test of tests) {
    await TabUtil.change(page, test.tabName());
    await test.assertClear(page);
  }
}
