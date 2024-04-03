import type { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import type { Combobox } from '../../pageobjects/Combobox';
import type { Section } from '../../pageobjects/Section';

class ProcessData extends PartObject {
  section: Section;
  dataClass: Combobox;

  constructor(part: Part) {
    super(part);
    this.section = part.section('Data Class');
    this.dataClass = this.section.combobox();
  }

  async fill() {
    await this.section.open();
    await this.dataClass.fill('test');
  }

  async assertFill() {
    await this.dataClass.expectValue('test');
  }

  async clear() {
    await this.dataClass.choose('AddContactData');
  }

  async assertClear() {
    await this.dataClass.expectValue('ch.ivyteam.documentation.project.AddContactData');
  }
}

export const ProcessDataTest = new NewPartTest('Process Data', (part: Part) => new ProcessData(part));
