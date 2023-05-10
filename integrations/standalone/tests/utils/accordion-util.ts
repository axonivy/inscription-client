import { Page } from '@playwright/test';

export namespace AccordionUtil {
  export async function toggle(page: Page, name: string) {
    await page.locator(`.accordion-trigger:has-text("${name}")`).click();
  }
}
