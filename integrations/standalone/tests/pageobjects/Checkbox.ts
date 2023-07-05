import { Locator, expect } from '@playwright/test';

export class Checkbox {
  private readonly locator: Locator;

  constructor(parentLocator: Locator, label: string) {
    this.locator = parentLocator.getByLabel(label);
  }

  uncheck() {
    this.locator.uncheck();
  }

  click() {
    this.locator.click();
  }

  async expectChecked() {
    await expect(this.locator).toBeChecked();
  }
}
