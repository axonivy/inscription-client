import { Locator, Page, expect } from '@playwright/test';
import { FocusCodeEditorUtil } from '../utils/code-editor-util';

export class CodeEditor {
  private readonly page: Page;
  private readonly locator: Locator;
  private readonly contentAssist: Locator;
  private readonly value: Locator;

  constructor(page: Page, parentLocator: Locator, activateOnFocus: boolean, label?: string) {
    this.page = page;
    this.contentAssist = parentLocator.locator('div.suggest-widget');
    if (label) {
      this.locator = parentLocator.getByLabel(label, { exact: true }).first();
    } else if (activateOnFocus) {
      this.locator = parentLocator.getByRole('textbox');
    } else {
      this.locator = parentLocator.getByRole('code').nth(0);
    }
    this.value = activateOnFocus ? this.locator : this.locator.getByRole('textbox');
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
