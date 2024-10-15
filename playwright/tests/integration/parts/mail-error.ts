import type { Checkbox } from '../../pageobjects/Checkbox';
import type { Part } from '../../pageobjects/Part';
import type { Section } from '../../pageobjects/Section';
import type { Select } from '../../pageobjects/Select';
import { NewPartTest, PartObject } from './part-tester';

class MailError extends PartObject {
  error: Section;
  errorSelect: Select;
  throw: Checkbox;

  constructor(part: Part) {
    super(part);
    this.error = part.section('Error');
    this.errorSelect = this.error.select({});
    this.throw = this.error.checkbox('Throw');
  }

  async fill() {
    await this.error.toggle();
    await this.errorSelect.choose('>> Ignore Exception');
    await this.throw.click();
  }
  async assertFill() {
    await this.error.expectIsOpen();
    await this.errorSelect.expectValue('>> Ignore Exception');
    await this.throw.expectChecked();
  }
  async clear() {
    await this.errorSelect.choose('ivy:error:email');
    await this.throw.click();
  }
  async assertClear() {
    await this.error.expectIsClosed();
  }
}

export const MailErrorTest = new NewPartTest('Error', (part: Part) => new MailError(part));
