import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class Combobox {
  private readonly combobox: Locator;

  constructor(readonly page: Page, parentLocator: Locator, options?: { label?: string; nth?: number }) {
    if (options?.label) {
      this.combobox = parentLocator.getByRole('combobox', { name: options.label }).first();
    } else {
      this.combobox = parentLocator.getByRole('combobox').nth(options?.nth ?? 0);
    }
  }

  async fill(value: string) {
    await this.combobox.fill(value);
    await this.combobox.blur();
  }

  async choose(value: string) {
    await this.combobox.fill(value);
    await this.page.getByRole('option', { name: value }).first().click();
  }

  async expectValue(value: string | RegExp) {
    await expect(this.combobox).toHaveValue(value);
  }
}
