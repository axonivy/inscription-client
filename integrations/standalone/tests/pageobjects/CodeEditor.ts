import { Locator, Page, expect } from '@playwright/test';

class CodeEditor {
  private readonly contentAssist: Locator;
  private readonly code: Locator;

  constructor(readonly page: Page, readonly locator: Locator, readonly value: Locator, readonly parentLocator: Locator) {
    this.contentAssist = parentLocator.locator('div.suggest-widget');
    this.code = parentLocator.locator('div.code-input').first();
  }

  async triggerContentAssist() {
    await this.focus();
    await expect(this.contentAssist).toBeHidden();
    await this.page.keyboard.press('Control+Space');
    await this.page.keyboard.press('Meta+Space');
    await expect(this.contentAssist).toBeVisible();
  }

  async fill(value: string) {
    await this.focus();
    await this.clearContent();
    await this.page.keyboard.type(value);
    await this.blur();
  }

  async clear() {
    await this.focus();
    await this.clearContent();
    await this.blur();
  }

  async focus() {
    await this.locator.click();
    await expect(this.code).toBeVisible();
  }

  private async blur() {
    await this.page.locator('*:focus').blur();
  }

  protected async clearContent() {
    await this.page.keyboard.press('Control+KeyA');
    await this.page.keyboard.press('Meta+KeyA');
    await this.page.keyboard.press('Delete');
  }

  async expectValue(value: string) {
    await expect(this.value).toHaveValue(value);
  }

  async expectEmpty() {
    await expect(this.value).toBeEmpty();
  }

  async expectContentAssistContains(contentAssist: string) {
    await expect(this.contentAssist).toContainText(contentAssist);
  }
}

export class ScriptArea extends CodeEditor {
  constructor(page: Page, parentLocator: Locator) {
    const locator = parentLocator.getByRole('code').nth(0);
    super(page, locator, locator.getByRole('textbox'), parentLocator);
  }
}

export class ScriptInput extends CodeEditor {
  constructor(page: Page, parentLocator: Locator, label?: string) {
    let locator = parentLocator.getByRole('textbox');
    if (label) {
      locator = parentLocator.getByLabel(label, { exact: true }).first();
    }
    super(page, locator, locator, parentLocator);
  }
}

export class MacroEditor extends CodeEditor {
  constructor(page: Page, parentLocator: Locator, label: string) {
    const locator = parentLocator.getByLabel(label, { exact: true }).first();
    super(page, locator, locator, parentLocator);
  }

  async expectValue(value: string) {
    await expect(this.value).toHaveText(value.replace('\n', ''));
  }
}

export class ScriptCell extends CodeEditor {
  constructor(page: Page, locator: Locator, parentLocator: Locator) {
    super(page, locator, locator, parentLocator);
  }

  async fill(value: string) {
    await this.focus();
    await this.clearContent();
    await this.page.keyboard.type(value);
  }
}
