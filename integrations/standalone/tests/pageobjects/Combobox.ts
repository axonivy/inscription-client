import { Locator, Page, expect } from '@playwright/test';

export class Combobox {
  private readonly locator: Locator;
  private readonly combobox: Locator;

  constructor(page: Page, parentLocator: Locator, label: string) {
    this.locator = parentLocator.locator('.combobox', { has: page.getByLabel(label) }).first();
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
