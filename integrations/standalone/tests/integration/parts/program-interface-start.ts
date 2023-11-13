import type { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import type { Section } from '../../pageobjects/Section';
import type { Select } from '../../pageobjects/Select';
import type { ScriptInput } from '../../pageobjects/CodeEditor';
import type { Combobox } from '../../pageobjects/Combobox';

class ProgramInterfaceStart extends PartObject {
  javaClass: Combobox;
  programSection: Section;
  errorProgram: Select;

  timeoutSection: Section;
  seconds: ScriptInput;
  errorTimeout: Select;

  constructor(part: Part) {
    super(part);
    this.javaClass = part.combobox('Java Class');

    this.programSection = part.section('Program');
    this.errorProgram = this.programSection.select('Error');

    this.timeoutSection = part.section('Timeout');
    this.seconds = this.timeoutSection.scriptInput('Seconds');
    this.errorTimeout = this.timeoutSection.select('Error');
  }

  async fill() {
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

export const ProgramInterfaceStartTest = new NewPartTest('Start', (part: Part) => new ProgramInterfaceStart(part));
