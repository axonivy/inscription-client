import { Locator, Page, expect } from '@playwright/test';
import { RESPONSIBLE_TYPE, ValuesAsUnion } from '@axonivy/inscription-protocol';
import { CodeEditor } from './CodeEditor';

export class ResponsibleSelect {
  private readonly locator: Locator;
  private readonly type: Locator;
  private readonly script: CodeEditor;
  private readonly combo: Locator;

  constructor(page: Page, parentLocator: Locator, label: string) {
    this.locator = parentLocator.locator('.responsible-select', { has: page.getByLabel(label) }).first();
    this.type = parentLocator.getByLabel(label).first();
    this.script = new CodeEditor(page, this.locator, true);
    this.combo = this.locator.getByRole('combobox').nth(1);
  }

  async fill(value: string) {
    await this.script.fill(value);
  }

  async clear() {
    await this.chooseType('Role');
    await this.combo.click();
    await this.locator.getByRole('option', { name: 'Everybody' }).first().click();
  }

  async chooseType(type: ValuesAsUnion<typeof RESPONSIBLE_TYPE>) {
    await this.type.click();
    await this.locator.getByRole('option', { name: type }).first().click();
  }

  async expectType(type: ValuesAsUnion<typeof RESPONSIBLE_TYPE>) {
    await expect(this.type).toHaveText(type);
  }

  async expectValue(value: string) {
    const type = await this.type.textContent();
    switch (type) {
      case 'Role from Attr.':
      case 'User from Attr.':
        await this.script.expectValue(value);
        break;
      case 'Role':
        await expect(this.combo).toHaveText(value);
        break;
      case 'Nobody & delete':
        throw new Error("There is not value to expect if type is 'Nobody & delete'");
    }
  }
}
