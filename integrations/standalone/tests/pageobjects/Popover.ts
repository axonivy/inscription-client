import { Page, expect } from '@playwright/test';
import { Part } from './Part';

export class Popover extends Part {
  constructor(page: Page) {
    super(page, Popover.locator(page));
  }

  private static locator(page: Page) {
    return page.locator(`.popover-content`);
  }

  async close() {
    await this.locator.locator('.popover-close').click();
  }

  async expectOpen() {
    await expect(this.locator).toHaveAttribute('data-state', 'open');
  }

  async expectHidden() {
    await expect(this.locator).toBeHidden();
  }
}
