import { Page, expect } from '@playwright/test';
import { inscriptionView } from '../../utils/engine-util';
import { AccordionUtil } from '../../utils/accordion-util';

export async function screenshotTab(page: Page, pid: string, tab: string, screenshotName: string) {
  await page.goto(inscriptionView(pid));
  await AccordionUtil.toggle(page, tab);
  await screenshot(page, screenshotName);
  await AccordionUtil.toggle(page, tab);
}

async function screenshot(page: Page, name: string) {
  const dir = process.env.SCREENSHOT_DIR ?? './target';
  await page.addStyleTag({ content: 'body { overflow: hidden; }' });
  const buffer = await page.screenshot({ path: `${dir}/screenshots/${name}`, fullPage: true, animations: 'disabled' });
  expect(buffer.byteLength).toBeGreaterThan(10000);
}
