import { expect, Page, Locator } from '@playwright/test';

export namespace CodeEditorUtil {
  export async function fill(page: Page, value: string) {
    await focus(page);
    await type(page, value);
  }

  export async function focus(page: Page) {
    await page.getByRole('code').nth(0).click();
  }

  export async function type(page: Page, value: string) {
    await clear(page);
    await page.keyboard.type(value);
  }

  export async function clear(page: Page) {
    await page.keyboard.press('Control+KeyA');
    await page.keyboard.press('Meta+KeyA');
    await page.keyboard.press('Delete');
  }

  export async function triggerContentAssist(page: Page) {
    triggerContentAssistWithLocator(page, page.getByRole('code').nth(0));
  }

  export async function triggerContentAssistWithLocator(page: Page, locator: Locator) {
    await locator.click();
    var content = contentAssist(page);
    await expect(content).toBeHidden();
    await page.keyboard.press('Control+Space');
    await page.keyboard.press('Meta+Space');
    await expect(content).toBeVisible();
  }

  function contentAssist(page: Page) {
    return page.locator('div.suggest-widget');
  }

  export async function assertValue(page: Page, value: string) {
    await expect(page.getByRole('code').getByRole('textbox')).toHaveValue(value);
  }

  export async function assertContentAssist(page: Page, expectedContentAssist: string) {
    var content = contentAssist(page);
    await expect(content).toContainText(expectedContentAssist);
  }
}

export namespace FocusCodeEditorUtil {
  export async function fill(page: Page, locator: Locator, value: string) {
    await locator.click();
    await CodeEditorUtil.type(page, value);
  }

  export async function clear(page: Page, locator: Locator) {
    await locator.click();
    await CodeEditorUtil.clear(page);
  }

  export async function triggerContentAssist(page: Page, locator: Locator) {
    await CodeEditorUtil.triggerContentAssistWithLocator(page, locator);
  }

  export async function assertContentAssist(page: Page, expectedContentAssist: string) {
    await CodeEditorUtil.assertContentAssist(page, expectedContentAssist);
  }
}
