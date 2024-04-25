import type { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import type { Section } from '../../pageobjects/Section';
import type { Combobox } from '../../pageobjects/Combobox';

class ProgramInterfaceStart extends PartObject {
  javaSection: Section;
  javaClass: Combobox;

  constructor(part: Part) {
    super(part);
    this.javaSection = part.section('Java Class');
    this.javaClass = this.javaSection.combobox();
  }

  async fill() {
    await this.javaSection.open();
    await this.javaClass.choose('ch.ivyteam.ivy.process.extension.impl.AbstractUserProcessExtension');
  }

  async assertFill() {
    await this.javaClass.expectValue('ch.ivyteam.ivy.process.extension.impl.AbstractUserProcessExtension');
  }

  async clear() {
    await this.javaClass.fill('');
  }

  async assertClear() {
    await this.javaClass.expectValue('');
  }
}

export const ProgramInterfaceStartTest = new NewPartTest('Java Bean', (part: Part) => new ProgramInterfaceStart(part));
