import { Locator, Page, expect } from '@playwright/test';

export class Combobox {
  private readonly locator: Locator;
  private readonly combobox: Locator;

  constructor(page: Page, parentLocator: Locator, options?: { label?: string; nth?: number }) {
    if (options?.label) {
      this.locator = parentLocator.locator('.combobox', { has: page.getByLabel(options.label) }).first();
    } else {
      this.locator = parentLocator.locator('.combobox').nth(options?.nth ?? 0);
    }
    this.combobox = this.locator.getByRole('combobox');
  }

  async fill(value: string) {
    await this.combobox.fill(value);
    await this.combobox.blur();
  }

  async choose(value: string) {
    await this.combobox.fill(value);
    await this.locator.getByRole('option', { name: value }).first().click();
  }

  async expectValue(value: string | RegExp) {
    await expect(this.combobox).toHaveValue(value);
  }
}
