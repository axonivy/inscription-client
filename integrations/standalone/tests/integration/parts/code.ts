import { NewPartTest, PartObject } from './part-tester';
import { Part } from '../../pageobjects/Part';
import { ScriptArea } from '../../pageobjects/CodeEditor';
import { Checkbox } from '../../pageobjects/Checkbox';

class Code extends PartObject {
  code: ScriptArea;
  sudo: Checkbox;

  constructor(part: Part) {
    super(part);
    this.code = part.scriptArea();
    this.sudo = part.checkbox('Disable Permission Checks');
  }

  async fill() {
    await this.code.fill('ivy.log.info("hi");');
    await this.sudo.check();
  }

  async assertFill() {
    await this.code.expectValue('ivy.log.info("hi");');
    await this.sudo.expectChecked();
  }

  async clear() {
    await this.code.clear();
    await this.sudo.uncheck();
  }

  async assertClear() {
    await this.code.expectEmpty();
    await this.sudo.expectUnchecked();
  }
}

export const CodeTest = new NewPartTest('Code', (part: Part) => new Code(part));
