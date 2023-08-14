import { Locator, expect } from '@playwright/test';
import { InscriptionView } from '../../pageobjects/InscriptionView';

export async function screenshotTab(view: InscriptionView, pid: string, part: string, screenshotName: string) {
  await view.selectElement(pid);
  await view.page.addStyleTag({ content: `body { overflow: hidden; } .ReactQueryDevtools { display: none; }` });
  const accordion = view.accordion(part);
  await accordion.toggle();
  await screenshot(accordion.currentLocator(), screenshotName);
  await accordion.toggle();
}

async function screenshot(locator: Locator, name: string) {
  const dir = process.env.SCREENSHOT_DIR ?? './target';
  const buffer = await locator.screenshot({ path: `${dir}/screenshots/${name}`, animations: 'disabled' });
  expect(buffer.byteLength).toBeGreaterThan(5000);
}
