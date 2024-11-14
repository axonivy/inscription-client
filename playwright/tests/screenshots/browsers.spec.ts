import { test, expect, type Page } from '@playwright/test';
import { InscriptionView } from '../pageobjects/InscriptionView';
import type { Section } from '../pageobjects/Section';
import { screenshot } from './screenshot-util';
import { Browser } from '../pageobjects/CodeEditor';

const GENERIC_PID = {
  SCRIPT: '168F0C6DF682858E-f3',
  USER_TASK: '168F0C6DF682858E-f5',
  DATABASE: '18141E75C9CEDD35-f3'
} as const;

test.describe('Browsers', () => {
  test('ScriptingBrowser', async ({ page }) => {
    const section = await openSection(page, GENERIC_PID.SCRIPT, 'Output', 'Code');
    const browser = await section.scriptArea().openBrowsers();
    const dialog = browser.dialog;

    await browser.openTab('Attribute');
    await expect(browser.table.getByRole('row', { name: 'addPerson' }).first()).toBeVisible();
    await screenshot(dialog, 'browser-attribute.png');

    await browser.openTab('CMS');
    await browser.search('Customer');
    await expect(browser.table.getByRole('row', { name: 'Customer' })).toBeVisible();
    await screenshot(dialog, 'browser-cms.png');

    await browser.openTab('Function');
    await browser.search('role');
    await expect(browser.table.getByRole('row', { name: 'ivy' })).toBeVisible();
    await screenshot(dialog, 'browser-function.png');

    await browser.openTab('Type');
    await browser.search('Per');
    await expect(browser.table.getByRole('cell', { name: 'Person :' })).toBeVisible();
    await screenshot(dialog, 'browser-type.png');
  });

  test('CodeFullScreen', async ({ page }) => {
    const section = await openSection(page, GENERIC_PID.SCRIPT, 'Output', 'Code');
    const browser = await section.scriptArea().openFullScreen();
    const dialog = browser.dialog;
    await screenshot(dialog, 'browser-codeFullscreen.png');
  });

  test('RoleBrowser', async ({ page }) => {
    const section = await openSection(page, GENERIC_PID.USER_TASK, 'Task', 'Responsible');
    await section.currentLocator().getByLabel('Browser').click();
    const browser = new Browser(page);
    await expect(browser.table.getByRole('row', { name: 'IT-Manager' })).toBeVisible();
    await screenshot(browser.dialog, 'browser-role.png');
  });

  test('DatabaseBrowser', async ({ page }) => {
    const section = await openSection(page, GENERIC_PID.DATABASE, 'Query', 'Condition');
    await section.currentLocator().locator('.script-area').click();
    await section.currentLocator().getByLabel('Browser').click();
    const browser = new Browser(page);
    await expect(browser.table.getByRole('row', { name: 'NAME: VARCHAR', exact: true })).toBeVisible();
    await screenshot(browser.dialog, 'browser-dbColumn.png');
  });
});

async function openSection(page: Page, pid: string, accordionName: string, sectionName: string): Promise<Section> {
  const view = await InscriptionView.selectElement(page, pid, 'inscription-test-project');
  await page.addStyleTag({ content: 'body { overflow: hidden; }' });
  const accordion = view.accordion(accordionName);
  await accordion.toggle();
  const section = accordion.section(sectionName);
  await section.open();
  await page.setViewportSize({ width: 500, height: 500 });
  return section;
}
