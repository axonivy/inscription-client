import { Page } from '@playwright/test';
import { AccordionUtil } from '../../utils/accordion-util';

export interface TabTest {
  tabName: () => string;
  fill: (page: Page) => Promise<void>;
  assertFill: (page: Page) => Promise<void>;
  clear: (page: Page) => Promise<void>;
  assertClear: (page: Page) => Promise<void>;
}

export async function fillReloadAndAssert(page: Page, tests: TabTest[]) {
  for (const test of tests) {
    await AccordionUtil.toggle(page, test.tabName());
    await test.fill(page);
    await AccordionUtil.toggle(page, test.tabName());
  }
  await page.reload();
  for (const test of tests) {
    await AccordionUtil.toggle(page, test.tabName());
    await test.assertFill(page);
    await AccordionUtil.toggle(page, test.tabName());
  }
  for (const test of tests) {
    await AccordionUtil.toggle(page, test.tabName());
    await test.clear(page);
    await AccordionUtil.toggle(page, test.tabName());
  }
  await page.reload();
  for (const test of tests) {
    await AccordionUtil.toggle(page, test.tabName());
    await test.assertClear(page);
    await AccordionUtil.toggle(page, test.tabName());
  }
}
