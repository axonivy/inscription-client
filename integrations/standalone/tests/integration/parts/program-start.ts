import { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import { Checkbox } from '../../pageobjects/Checkbox';
import { Section } from '../../pageobjects/Section';
import { Select } from '../../pageobjects/Select';
import { TextArea } from '../../pageobjects/TextArea';

class ProgramStart extends PartObject {
  javaClass: TextArea;
  permissionSection: Section;
  anonymousAllow: Checkbox;
  role: Select;
  error: Select;

  constructor(part: Part) {
    super(part);
    this.javaClass = part.textArea('Java Class');

    this.permissionSection = part.section('Permission');
    this.anonymousAllow = this.permissionSection.checkbox('Allow anonymous');
    this.role = this.permissionSection.select('Role');
    this.error = this.permissionSection.select('Violation error');
  }

  async fill() {
    await this.javaClass.fill('test');

    await this.permissionSection.toggle();

    await this.anonymousAllow.click();
    await this.role.choose('SYSTEM');
    await this.error.choose('>> Ignore Exception');
  }

  async assertFill() {
    await this.javaClass.expectValue('test');

    await this.permissionSection.expectIsOpen();
    await this.anonymousAllow.expectUnchecked();
    await this.role.expectValue('SYSTEM');
    await this.error.expectValue('>> Ignore Exception');
  }

  async clear() {
    await this.javaClass.clear();

    await this.role.choose('Everybody');
    await this.error.choose('ivy:security:forbidden');
    await this.anonymousAllow.click();
  }

  async assertClear() {
    await this.javaClass.expectEmpty();

    await this.permissionSection.expectIsClosed();
  }
}

export const ProgramStartTest = new NewPartTest('Start', (part: Part) => new ProgramStart(part));