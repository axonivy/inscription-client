import type { Locator, Page} from '@playwright/test';
import { expect } from '@playwright/test';
import { InscriptionView } from '../../pageobjects/InscriptionView';

export async function screenshotTab(page: Page, pid: string, part: string, screenshotName: string) {
  const view = await InscriptionView.selectElement(page, pid, 'inscription-screenshot');
  await page.addStyleTag({ content: 'body { overflow: hidden; }' });
  const accordion = view.accordion(part);
  await accordion.toggle();
  await screenshot(accordion.currentLocator(), screenshotName);
  await accordion.toggle();
}

async function screenshot(page: Locator, name: string) {
  const dir = process.env.SCREENSHOT_DIR ?? './target';
  const buffer = await page.screenshot({ path: `${dir}/screenshots/${name}`, animations: 'disabled' });
  expect(buffer.byteLength).toBeGreaterThan(4000);
}
