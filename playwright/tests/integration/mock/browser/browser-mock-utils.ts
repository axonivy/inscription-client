import { expect, type Page } from '@playwright/test';

export async function assertCodeHidden(page: Page) {
  await expect(code(page)).toBeHidden();
  await expect(browserBtn(page)).toHaveCount(0);
}

export async function assertCodeVisible(page: Page) {
  await expect(code(page)).toBeVisible();
  await expect(browserBtn(page)).toHaveCount(1);
}

export function code(page: Page) {
  return page.getByRole('code');
}

export function browserBtn(page: Page) {
  return page.getByRole('button', { name: 'Browser' });
}

export async function applyBrowser(page: Page, browser: string, expectedSelection: string = '', rowToCheck: number, dblClick?: boolean) {
  await browserBtn(page).nth(0).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByText(browser).first().click();
  await page.getByRole('row').nth(rowToCheck).click();

  if (dblClick) {
    await page.getByRole('row').nth(rowToCheck).dblclick();
  } else {
    await expect(page.locator('.browser-helptext')).toHaveText(expectedSelection);
    await page.getByRole('button', { name: 'Apply' }).click();
  }

  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(browserBtn(page).nth(0)).toBeVisible();
}
