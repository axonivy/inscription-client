import { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import { TextArea } from '../../pageobjects/TextArea';

class ProcessData extends PartObject {
  dataClass: TextArea;

  constructor(part: Part) {
    super(part);
    this.dataClass = part.textArea('Data Class');
  }

  async fill() {
    await this.dataClass.fill('test');
  }

  async assertFill() {
    await this.dataClass.expectValue('test');
  }

  async clear() {
    await this.dataClass.clear();
  }

  async assertClear() {
    await this.dataClass.expectEmpty();
  }
}

export const ProcessDataTest = new NewPartTest('Process Data', (part: Part) => new ProcessData(part));
