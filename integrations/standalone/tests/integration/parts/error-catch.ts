import { Combobox } from '../../pageobjects/Combobox';
import { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';

class ErrorCatch extends PartObject {
  error: Combobox;

  constructor(part: Part) {
    super(part);
    this.error = part.combobox('Error');
  }

  async fill() {
    await this.error.choose('ivy:error');
  }

  async assertFill() {
    await this.error.expectValue('ivy:error');
  }

  async clear() {
    await this.error.choose('');
  }

  async assertClear() {
    await this.error.expectValue('');
  }
}

export const ErrorCatchTest = new NewPartTest('Error', (part: Part) => new ErrorCatch(part));
