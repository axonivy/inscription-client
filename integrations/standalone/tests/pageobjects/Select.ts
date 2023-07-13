import { Locator, Page, expect } from '@playwright/test';

export class Select {
  private readonly locator: Locator;

  constructor(page: Page, parentLocator: Locator, label: string) {
    this.locator = parentLocator.locator('.select', { has: page.getByLabel(label) }).first();
  }

  async choose(value: string | RegExp) {
    await this.locator.getByRole('combobox').first().click();
    await this.locator.getByRole('option', { name: value }).first().click();
  }

  async expectValue(value: string | RegExp) {
    await expect(this.locator).toHaveText(value);
  }
}
