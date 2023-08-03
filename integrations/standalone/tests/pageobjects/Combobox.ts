import { Locator, Page, expect } from '@playwright/test';

export class Combobox {
  private readonly locator: Locator;

  constructor(page: Page, parentLocator: Locator, label: string) {
    this.locator = parentLocator.locator('.combobox', { has: page.getByLabel(label) }).first();
  }

  async fill(value: string) {
    await this.locator.getByRole('combobox').fill(value);
  }

  async choose(value: string) {
    await this.fill(value);
    await this.locator.getByRole('option', { name: value }).first().click();
  }

  async expectValue(value: string | RegExp) {
    await expect(this.locator.getByRole('combobox')).toHaveValue(value);
  }
}
