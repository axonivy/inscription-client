import type { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import type { Checkbox } from '../../pageobjects/Checkbox';
import type { Section } from '../../pageobjects/Section';
import type { Select } from '../../pageobjects/Select';
import type { Combobox } from '../../pageobjects/Combobox';

class ProgramStart extends PartObject {
  javaSection: Section;
  javaClass: Combobox;
  permissionSection: Section;
  anonymousAllow: Checkbox;
  role: Select;
  error: Select;

  constructor(part: Part) {
    super(part);
    this.javaSection = part.section('Java Class');
    this.javaClass = this.javaSection.combobox();

    this.permissionSection = part.section('Permission');
    this.anonymousAllow = this.permissionSection.checkbox('Allow anonymous');
    this.role = this.permissionSection.select({ label: 'Role' });
    this.error = this.permissionSection.select({ label: 'Violation error' });
  }

  async fill() {
    await this.javaSection.open();
    await this.javaClass.choose('ch.ivyteam.ivy.process.eventstart.AbstractProcessStartEventBean');

    await this.permissionSection.toggle();

    await this.anonymousAllow.click();
    await this.role.choose('Support');
    await this.error.choose('>> Ignore Exception');
  }

  async assertFill() {
    await this.javaClass.expectValue('ch.ivyteam.ivy.process.eventstart.AbstractProcessStartEventBean');

    await this.permissionSection.expectIsOpen();
    await this.anonymousAllow.expectUnchecked();
    await this.role.expectValue('Support');
    await this.error.expectValue('>> Ignore Exception');
  }

  async clear() {
    await this.role.choose('Everybody');
    await this.error.choose('ivy:security:forbidden');
    await this.anonymousAllow.click();
  }

  async assertClear() {
    await this.javaClass.expectValue('ch.ivyteam.ivy.process.eventstart.AbstractProcessStartEventBean');

    await this.permissionSection.expectIsClosed();
  }
}

export const ProgramStartTest = new NewPartTest('Start', (part: Part) => new ProgramStart(part));
