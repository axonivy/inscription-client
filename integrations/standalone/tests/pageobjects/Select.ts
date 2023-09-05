import { Locator, Page, expect } from '@playwright/test';

export class Select {
  private readonly locator: Locator;

  constructor(page: Page, parentLocator: Locator, options?: { label?: string; nth?: number }) {
    if (options?.label) {
      this.locator = parentLocator.locator('.select', { has: page.getByLabel(options.label) }).first();
    } else {
      this.locator = parentLocator.locator('.select').nth(options?.nth ?? 0);
    }
  }

  async choose(value: string | RegExp) {
    await this.locator.getByRole('combobox').first().click();
    await this.locator.getByRole('option', { name: value }).first().click();
  }

  async expectValue(value: string | RegExp) {
    await expect(this.locator).toHaveText(value);
  }
}
