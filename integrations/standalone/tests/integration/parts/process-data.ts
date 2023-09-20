import { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import { Combobox } from '../../pageobjects/Combobox';

class ProcessData extends PartObject {
  dataClass: Combobox;

  constructor(part: Part) {
    super(part);
    this.dataClass = part.combobox('Data Class');
  }

  async fill() {
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
