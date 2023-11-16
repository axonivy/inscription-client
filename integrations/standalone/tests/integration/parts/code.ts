import { NewPartTest, PartObject } from './part-tester';
import type { Part } from '../../pageobjects/Part';
import type { ScriptArea } from '../../pageobjects/CodeEditor';
import type { Checkbox } from '../../pageobjects/Checkbox';

class Script extends PartObject {
  code: ScriptArea;
  sudo: Checkbox;

  constructor(part: Part, private readonly hasSudo = true) {
    super(part);
    this.code = part.scriptArea();
    this.sudo = part.checkbox('Disable Permission Checks');
  }

  async fill() {
    await this.code.fill('code');
    if (this.hasSudo) {
      await this.sudo.click();
    }
  }

  async assertFill() {
    await this.code.expectValue('code');
    if (this.hasSudo) {
      await this.sudo.expectChecked();
    }
  }

  async clear() {
    await this.code.clear();
    if (this.hasSudo) {
      await this.sudo.click();
    }
  }

  async assertClear() {
    await this.code.expectEmpty();
    if (this.hasSudo) {
      await this.sudo.expectUnchecked();
    }
  }
}

export const OutputScriptTest = new NewPartTest('Script', (part: Part) => new Script(part));
export const ScriptTest = new NewPartTest('Script', (part: Part) => new Script(part, false));
