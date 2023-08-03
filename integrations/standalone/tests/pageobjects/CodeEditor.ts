import { Locator, Page, expect } from '@playwright/test';
import { CodeEditorUtil } from '../utils/code-editor-util';

class CodeEditor {
  protected contentAssist: Locator;

  constructor(readonly page: Page, readonly locator: Locator, readonly value: Locator, readonly parentLocator: Locator) {
    this.contentAssist = parentLocator.locator('div.suggest-widget');
  }

  async triggerContentAssist() {
    await CodeEditorUtil.triggerContentAssistWithLocator(this.page, this.locator);
  }

  async fill(value: string) {
    await this.locator.click();
    await CodeEditorUtil.type(this.page, value);
    await this.page.locator('*:focus').blur();
  }

  async clear() {
    await this.locator.click();
    await CodeEditorUtil.clear(this.page);
    await this.page.locator('*:focus').blur();
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
