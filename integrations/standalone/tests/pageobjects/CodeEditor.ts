import { Locator, Page, expect } from '@playwright/test';
import { FocusCodeEditorUtil } from '../utils/code-editor-util';

class CodeEditor {
  protected contentAssist: Locator;

  constructor(readonly page: Page, readonly locator: Locator, readonly value: Locator, parentLocator: Locator) {
    this.contentAssist = parentLocator.locator('div.suggest-widget');
  }

  async triggerContentAssist() {
    await FocusCodeEditorUtil.triggerContentAssist(this.page, this.locator);
  }

  async fill(value: string) {
    await FocusCodeEditorUtil.fill(this.page, this.locator, value);
  }

  async clear() {
    await FocusCodeEditorUtil.clear(this.page, this.locator);
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
