import type { MacroEditor } from '../../pageobjects/CodeEditor';
import type { Part } from '../../pageobjects/Part';
import type { Select } from '../../pageobjects/Select';
import { NewPartTest, PartObject } from './part-tester';

class MailContent extends PartObject {
  type: Select;
  message: MacroEditor;

  constructor(part: Part) {
    super(part);
    this.type = part.select('Type');
    this.message = part.macroArea('Message');
  }

  async fill() {
    await this.type.choose('text/html');
    await this.message.fill('Hello\nWorld');
  }
  async assertFill() {
    await this.type.expectValue('text/html');
    await this.message.expectValue('Hello\nWorld');
  }
  async clear() {
    await this.type.choose('text/plain');
    await this.message.clear();
  }
  async assertClear() {
    await this.type.expectValue('text/plain');
    await this.message.expectEmpty();
  }
}

export const MailContentTest = new NewPartTest('Content', (part: Part) => new MailContent(part));
