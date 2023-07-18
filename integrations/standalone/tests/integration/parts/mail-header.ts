import { Part } from '../../pageobjects/Part';
import { PartTest } from './part-tester';

export class MailHeaderTester implements PartTest {
  partName() {
    return 'Header';
  }
  async fill(part: Part) {
    await part.macroInput('Subject').fill('subject');
    await part.macroInput('From').fill('from');
    await part.macroInput('Reply to').fill('reply');
    await part.macroInput('To').fill('to');
    await part.macroInput('CC').fill('cc');
    await part.macroInput('BCC').fill('bcc');
    const options = part.section('Options');
    await options.toggle();
    // await options.select('Error').choose('>> Ignore Exception');
    await options.checkbox('Throw').check();
  }
  async assertFill(part: Part) {
    await part.macroInput('Subject').expectValue('subject');
    await part.macroInput('From').expectValue('from');
    await part.macroInput('Reply to').expectValue('reply');
    await part.macroInput('To').expectValue('to');
    await part.macroInput('CC').expectValue('cc');
    await part.macroInput('BCC').expectValue('bcc');
    const options = part.section('Options');
    await options.isOpen();
    // await options.select('Error').expectValue('>> Ignore Exception');
    await options.checkbox('Throw').expectChecked();
  }
  async clear(part: Part) {
    await part.macroInput('Subject').clear();
    await part.macroInput('From').clear();
    await part.macroInput('Reply to').clear();
    await part.macroInput('To').clear();
    await part.macroInput('CC').clear();
    await part.macroInput('BCC').clear();
    const options = part.section('Options');
    // await options.select('Error').choose('ivy:error:mail');
    await options.checkbox('Throw').uncheck();
  }
  async assertClear(part: Part) {
    await part.macroInput('Subject').expectEmpty();
    await part.macroInput('From').expectEmpty();
    await part.macroInput('Reply to').expectEmpty();
    await part.macroInput('To').expectEmpty();
    await part.macroInput('CC').expectEmpty();
    await part.macroInput('BCC').expectEmpty();
    await part.section('Options').isClosed();
  }
}

export const MailHeaderTest = new MailHeaderTester();
