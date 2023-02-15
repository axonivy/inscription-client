import { Page, expect } from '@playwright/test';

export namespace CollapseUtil {
  export async function open(page: Page, label: string) {
    await page.getByRole('button', { name: label }).click();
  }

  export async function assertClosed(page: Page, label: string) {
    await expect(page.getByRole('button', { name: label })).toHaveAttribute('data-state', 'closed');
  }
}
