import { Page } from '@playwright/test';
import { AccordionUtil } from '../../utils/accordion-util';

export interface PartTest {
  partName: () => string;
  fill: (page: Page) => Promise<void>;
  assertFill: (page: Page) => Promise<void>;
  clear: (page: Page) => Promise<void>;
  assertClear: (page: Page) => Promise<void>;
}

export async function fillReloadAndAssert(page: Page, tests: PartTest[]) {
  for (const test of tests) {
    await AccordionUtil.toggle(page, test.partName());
    await test.fill(page);
    await AccordionUtil.toggle(page, test.partName());
  }
  await page.reload();
  for (const test of tests) {
    await AccordionUtil.toggle(page, test.partName());
    await test.assertFill(page);
    await AccordionUtil.toggle(page, test.partName());
  }
  for (const test of tests) {
    await AccordionUtil.toggle(page, test.partName());
    await test.clear(page);
    await AccordionUtil.toggle(page, test.partName());
  }
  await page.reload();
  for (const test of tests) {
    await AccordionUtil.toggle(page, test.partName());
    await test.assertClear(page);
    await AccordionUtil.toggle(page, test.partName());
  }
}
