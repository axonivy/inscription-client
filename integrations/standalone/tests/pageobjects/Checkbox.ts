import { Locator, expect } from '@playwright/test';

export class Checkbox {
  private readonly locator: Locator;

  constructor(parentLocator: Locator, label: string) {
    this.locator = parentLocator.getByLabel(label);
  }

  async uncheck() {
    await this.locator.uncheck();
  }

  async check() {
    await this.locator.check();
  }

  async expectChecked() {
    await expect(this.locator).toBeChecked();
  }

  async expectUnchecked() {
    await expect(this.locator).not.toBeChecked();
  }
}
