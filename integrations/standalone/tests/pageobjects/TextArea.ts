import type { Locator} from '@playwright/test';
import { expect } from '@playwright/test';

export class TextArea {
  private readonly locator: Locator;

  constructor(parentLocator: Locator, label: string) {
    this.locator = parentLocator.getByLabel(label);
  }

  async fill(value: string) {
    await this.locator.fill(value);
  }

  async clear() {
    await this.locator.clear();
  }

  async expectValue(value: string) {
    await expect(this.locator).toHaveValue(value);
  }

  async expectEmpty() {
    await expect(this.locator).toBeEmpty();
  }

  async expectEnabled() {
    await expect(this.locator).not.toBeDisabled();
  }

  async expectDisabled() {
    await expect(this.locator).toBeDisabled();
  }
}
