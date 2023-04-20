import { expect, Page } from '@playwright/test';

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

  export async function assertValue(page: Page, value: string) {
    await expect(page.getByRole('code').getByRole('textbox')).toHaveValue(value);
  }
}
