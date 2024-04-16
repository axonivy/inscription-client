import type { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import type { Section } from '../../pageobjects/Section';
import type { Select } from '../../pageobjects/Select';

class WsError extends PartObject {
  errorSection: Section;
  exception: Select;

  constructor(part: Part) {
    super(part);
    this.errorSection = part.section('Error');
    this.exception = this.errorSection.select({});
  }

  async fill() {
    await this.errorSection.toggle();
    await this.exception.choose('>> Ignore Exception');
  }

  async assertFill() {
    await this.errorSection.expectIsOpen();
    await this.exception.expectValue('>> Ignore Exception');
  }

  async clear() {
    await this.exception.choose('ivy:error:webservice:exception');
  }

  async assertClear() {
    await this.errorSection.expectIsClosed();
  }
}

export const WsErrorTest = new NewPartTest('Error', (part: Part) => new WsError(part));
