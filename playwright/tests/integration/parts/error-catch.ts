import type { Combobox } from '../../pageobjects/Combobox';
import type { Part } from '../../pageobjects/Part';
import type { Section } from '../../pageobjects/Section';
import { NewPartTest, PartObject } from './part-tester';

class ErrorCatch extends PartObject {
  section: Section;
  error: Combobox;

  constructor(part: Part) {
    super(part);
    this.section = part.section('Error Code');
    this.error = this.section.combobox();
  }

  async fill() {
    await this.section.open();
    await this.error.choose('ivy:error');
  }

  async assertFill() {
    await this.error.expectValue('ivy:error');
  }

  async clear() {
    await this.error.choose('');
  }

  async assertClear() {
    await this.section.expectIsClosed();
  }
}

export const ErrorCatchTest = new NewPartTest('Error', (part: Part) => new ErrorCatch(part));
