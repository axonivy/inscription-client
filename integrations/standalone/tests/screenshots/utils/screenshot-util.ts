import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { InscriptionView } from '../../pageobjects/InscriptionView';

export async function screenshotAccordion(page: Page, pid: string, accordionName: string, screenshotName: string, fullView = false) {
  const view = await InscriptionView.selectElement(page, pid, 'inscription-screenshot');
  await page.addStyleTag({ content: 'body { overflow: hidden; }' });
  const accordion = view.accordion(accordionName);
  await accordion.toggle();
  if (fullView) {
    await screenshot(view.page.locator('.editor .content'), screenshotName);
  } else {
    await screenshot(accordion.currentLocator(), screenshotName);
  }
  await accordion.toggle();
}

export async function screenshotSection(page: Page, pid: string, accordionName: string, sectionName: string, screenshotName: string) {
  const view = await InscriptionView.selectElement(page, pid, 'inscription-screenshot');
  await page.addStyleTag({ content: 'body { overflow: hidden; }' });
  const accordion = view.accordion(accordionName);
  await accordion.toggle();
  const section = accordion.section(sectionName);
  await section.open();
  await screenshot(section.currentLocator(), screenshotName);
  await accordion.toggle();
}

async function screenshot(page: Locator, name: string) {
  const dir = process.env.SCREENSHOT_DIR ?? './target';
  const buffer = await page.screenshot({ path: `${dir}/screenshots/${name}`, animations: 'disabled' });
  expect(buffer.byteLength).toBeGreaterThan(3000);
}
