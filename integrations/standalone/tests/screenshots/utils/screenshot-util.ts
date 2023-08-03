import { Locator, Page, expect } from '@playwright/test';
import { InscriptionView } from '../../pageobjects/InscriptionView';

export async function screenshotTab(page: Page, pid: string, part: string, screenshotName: string) {
  const inscriptionView = new InscriptionView(page);
  await inscriptionView.selectElement(pid);
  await page.addStyleTag({ content: `body { overflow: hidden; } .ReactQueryDevtools { display: none; }` });
  const accordion = inscriptionView.accordion(part);
  await accordion.toggle();
  await screenshot(accordion.currentLocator(), screenshotName);
  await accordion.toggle();
}

async function screenshot(page: Locator, name: string) {
  const dir = process.env.SCREENSHOT_DIR ?? './target';
  const buffer = await page.screenshot({ path: `${dir}/screenshots/${name}`, animations: 'disabled' });
  expect(buffer.byteLength).toBeGreaterThan(5000);
}
