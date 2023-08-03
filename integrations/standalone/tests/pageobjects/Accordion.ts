import { Locator, Page, expect } from '@playwright/test';
import { Part } from './Part';
import { Tab } from './Tab';
import { PartStateFlag } from '@axonivy/inscription-editor/src/components/editors/part/usePart';

export class Accordion extends Part {
  private readonly toggleButtonLocator: Locator;

  constructor(page: Page, label: string) {
    super(page, Accordion.locator(page, label));
    this.toggleButtonLocator = Accordion.toggleButtonLocator(page, label);
  }

  async toggle() {
    await this.toggleButtonLocator.click();
  }

  private static locator(page: Page, label: string) {
    return page.locator(`.accordion-item`, { has: Accordion.toggleButtonLocator(page, label) });
  }

  private static toggleButtonLocator(page: Page, label: string) {
    return page.locator(`.accordion-trigger:has-text("${label}")`);
  }

  tab(label: string) {
    return new Tab(this.page, this.locator, label);
  }

  resetButton() {
    return this.page.locator('.accordion-header-group button');
  }

  async expectState(state: PartStateFlag) {
    const stateLocator = this.locator.locator('.accordion-state');
    await expect(stateLocator).toHaveAttribute('data-state', state);
  }
}
