import type { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import type { Section } from '../../pageobjects/Section';
import type { Select } from '../../pageobjects/Select';
import type { ScriptInput } from '../../pageobjects/CodeEditor';
import type { Combobox } from '../../pageobjects/Combobox';

class ProgramInterfaceStart extends PartObject {
  javaSection: Section;
  javaClass: Combobox;
  programSection: Section;
  errorProgram: Select;

  timeoutSection: Section;
  seconds: ScriptInput;
  errorTimeout: Select;

  constructor(part: Part) {
    super(part);
    this.javaSection = part.section('Java Class');
    this.javaClass = this.javaSection.combobox();

    this.programSection = part.section('Program');
    this.errorProgram = this.programSection.select({ label: 'Error' });

    this.timeoutSection = part.section('Timeout');
    this.seconds = this.timeoutSection.scriptInput('Seconds');
    this.errorTimeout = this.timeoutSection.select({ label: 'Error' });
  }

  async fill() {
    await this.javaSection.open();
    await this.javaClass.choose('ch.ivyteam.ivy.process.extension.impl.AbstractUserProcessExtension');

    await this.programSection.toggle();
    await this.errorProgram.choose('>> Ignore Exception');

    await this.timeoutSection.toggle();
    await this.seconds.fill('3');
    await this.errorTimeout.choose('>> Ignore Exception');
  }

  async assertFill() {
    await this.javaClass.expectValue('ch.ivyteam.ivy.process.extension.impl.AbstractUserProcessExtension');

    await this.programSection.expectIsOpen();
    await this.errorProgram.expectValue('>> Ignore Exception');

    await this.timeoutSection.expectIsOpen();
    await this.seconds.expectValue('3');
    await this.errorTimeout.expectValue('>> Ignore Exception');
  }

  async clear() {
    await this.errorProgram.choose('ivy:error:program:exception');

    await this.seconds.clear();
    await this.errorTimeout.choose('ivy:error:program:timeout');
  }

  async assertClear() {
    await this.javaClass.expectValue('ch.ivyteam.ivy.process.extension.impl.AbstractUserProcessExtension');
    await this.programSection.expectIsClosed();
    await this.timeoutSection.expectIsClosed();
  }
}

class RuleInterfaceStart extends PartObject {
  programSection: Section;
  errorProgram: Select;

  timeoutSection: Section;
  seconds: ScriptInput;
  errorTimeout: Select;

  constructor(part: Part) {
    super(part);
    this.programSection = part.section('Program');
    this.errorProgram = this.programSection.select({ label: 'Error' });

    this.timeoutSection = part.section('Timeout');
    this.seconds = this.timeoutSection.scriptInput('Seconds');
    this.errorTimeout = this.timeoutSection.select({ label: 'Error' });
  }

  async fill() {
    await this.programSection.toggle();
    await this.errorProgram.choose('>> Ignore Exception');

    await this.timeoutSection.toggle();
    await this.seconds.fill('3');
    await this.errorTimeout.choose('>> Ignore Exception');
  }

  async assertFill() {
    await this.programSection.expectIsOpen();
    await this.errorProgram.expectValue('>> Ignore Exception');

    await this.timeoutSection.expectIsOpen();
    await this.seconds.expectValue('3');
    await this.errorTimeout.expectValue('>> Ignore Exception');
  }

  async clear() {
    await this.errorProgram.choose('ivy:error:program:exception');

    await this.seconds.fill('');
    await this.errorTimeout.choose('ivy:error:program:timeout');
  }

  async assertClear() {
    await this.programSection.expectIsClosed();
    await this.timeoutSection.expectIsClosed();
  }
}

export const ProgramInterfaceStartTest = new NewPartTest('Java Bean', (part: Part) => new ProgramInterfaceStart(part));
export const RuleInterfaceStartTest = new NewPartTest('Java Bean', (part: Part) => new RuleInterfaceStart(part));
