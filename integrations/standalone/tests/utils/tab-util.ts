import { Page } from '@playwright/test';

export namespace TabUtil {
  export async function change(page: Page, tab: string) {
    await page.getByRole('tab', { name: tab }).click();
  }
}
