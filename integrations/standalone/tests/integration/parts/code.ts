import { NewPartTest, PartObject } from './part-tester';
import type { Part } from '../../pageobjects/Part';
import type { ScriptArea } from '../../pageobjects/CodeEditor';
import type { Checkbox } from '../../pageobjects/Checkbox';
import type { Section } from '../../pageobjects/Section';

class Script extends PartObject {
  section: Section;
  code: ScriptArea;
  sudo: Checkbox;

  constructor(part: Part, private readonly hasSudo = true) {
    super(part);
    this.section = part.section('Code');
    this.code = this.section.scriptArea();
    this.sudo = this.section.checkbox('Disable Permission Checks');
  }

  async fill() {
    await this.section.open();
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
    await this.section.expectIsClosed();
  }
}

export const OutputScriptTest = new NewPartTest('Script', (part: Part) => new Script(part));
export const ScriptTest = new NewPartTest('Script', (part: Part) => new Script(part, false));
