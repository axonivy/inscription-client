import type { MacroEditor } from '../../pageobjects/CodeEditor';
import type { Part } from '../../pageobjects/Part';
import type { Section } from '../../pageobjects/Section';
import { NewPartTest, PartObject } from './part-tester';

class MailHeader extends PartObject {
  headers: Section;
  subject: MacroEditor;
  from: MacroEditor;
  reply: MacroEditor;
  to: MacroEditor;
  cc: MacroEditor;
  bcc: MacroEditor;

  constructor(part: Part) {
    super(part);
    this.headers = part.section('Headers');
    this.subject = this.headers.macroInput('Subject');
    this.from = this.headers.macroInput('From');
    this.reply = this.headers.macroInput('Reply to');
    this.to = this.headers.macroInput('To');
    this.cc = this.headers.macroInput('CC');
    this.bcc = this.headers.macroInput('BCC');
  }

  async fill() {
    await this.headers.open();
    await this.subject.fill('subject');
    await this.from.fill('from');
    await this.reply.fill('reply');
    await this.to.fill('to');
    await this.cc.fill('cc');
    await this.bcc.fill('bcc');
  }
  async assertFill() {
    await this.subject.expectValue('subject');
    await this.from.expectValue('from');
    await this.reply.expectValue('reply');
    await this.to.expectValue('to');
    await this.cc.expectValue('cc');
    await this.bcc.expectValue('bcc');
  }
  async clear() {
    await this.subject.clear();
    await this.from.clear();
    await this.reply.clear();
    await this.to.clear();
    await this.cc.clear();
    await this.bcc.clear();
  }
  async assertClear() {
    await this.headers.expectIsClosed();
  }
}

export const MailHeaderTest = new NewPartTest('Header', (part: Part) => new MailHeader(part));
