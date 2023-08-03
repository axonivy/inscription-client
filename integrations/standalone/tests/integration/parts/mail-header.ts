import { Checkbox } from '../../pageobjects/Checkbox';
import { MacroEditor } from '../../pageobjects/CodeEditor';
import { Part } from '../../pageobjects/Part';
import { Section } from '../../pageobjects/Section';
import { Select } from '../../pageobjects/Select';
import { NewPartTest, PartObject } from './part-tester';

class MailHeader extends PartObject {
  subject: MacroEditor;
  from: MacroEditor;
  reply: MacroEditor;
  to: MacroEditor;
  cc: MacroEditor;
  bcc: MacroEditor;
  options: Section;
  error: Select;
  throw: Checkbox;

  constructor(part: Part) {
    super(part);
    this.subject = part.macroInput('Subject');
    this.from = part.macroInput('From');
    this.reply = part.macroInput('Reply to');
    this.to = part.macroInput('To');
    this.cc = part.macroInput('CC');
    this.bcc = part.macroInput('BCC');
    this.options = part.section('Options');
    this.error = this.options.select('Error');
    this.throw = this.options.checkbox('Throw');
  }

  async fill() {
    await this.subject.fill('subject');
    await this.from.fill('from');
    await this.reply.fill('reply');
    await this.to.fill('to');
    await this.cc.fill('cc');
    await this.bcc.fill('bcc');

    await this.options.toggle();
    await this.error.choose('>> Ignore Exception');
    await this.throw.check();
  }
  async assertFill() {
    await this.subject.expectValue('subject');
    await this.from.expectValue('from');
    await this.reply.expectValue('reply');
    await this.to.expectValue('to');
    await this.cc.expectValue('cc');
    await this.bcc.expectValue('bcc');

    await this.options.expectIsOpen();
    await this.error.expectValue('>> Ignore Exception');
    await this.throw.expectChecked();
  }
  async clear() {
    await this.subject.clear();
    await this.from.clear();
    await this.reply.clear();
    await this.to.clear();
    await this.cc.clear();
    await this.bcc.clear();
    await this.error.choose('ivy:error:email');
    await this.throw.uncheck();
  }
  async assertClear() {
    await this.subject.expectEmpty();
    await this.from.expectEmpty();
    await this.reply.expectEmpty();
    await this.to.expectEmpty();
    await this.cc.expectEmpty();
    await this.bcc.expectEmpty();
    await this.options.expectIsClosed();
  }
}

export const MailHeaderTest = new NewPartTest('Header', (part: Part) => new MailHeader(part));
