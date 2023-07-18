import { Part } from '../../pageobjects/Part';
import { PartTest } from './part-tester';

export class MailContentTester implements PartTest {
  partName() {
    return 'Content';
  }
  async fill(part: Part) {
    await part.select('Type').choose('text/html');
    await part.macroArea('Message').fill('Hello\nWorld');
  }
  async assertFill(part: Part) {
    await part.select('Type').expectValue('text/html');
    await part.macroArea('Message').expectValue('Hello\nWorld');
  }
  async clear(part: Part) {
    await part.select('Type').choose('text/plain');
    await part.macroArea('Message').clear();
  }
  async assertClear(part: Part) {
    await part.select('Type').expectValue('text/plain');
    await part.macroArea('Message').expectEmpty();
  }
}

export const MailContentTest = new MailContentTester();
