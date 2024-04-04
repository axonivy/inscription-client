import type { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import type { TextArea } from '../../pageobjects/TextArea';
import type { Section } from '../../pageobjects/Section';

class EndPage extends PartObject {
  section: Section;
  endPage: TextArea;

  constructor(part: Part) {
    super(part);
    this.section = part.section('End Page');
    this.endPage = this.section.textArea({});
  }

  async fill() {
    await this.section.open();
    await this.endPage.fill('page.xhtml');
  }

  async assertFill() {
    await this.endPage.expectValue('page.xhtml');
  }

  async clear() {
    await this.endPage.clear();
  }

  async assertClear() {
    await this.section.expectIsClosed();
  }
}

export const EndPageTest = new NewPartTest('End Page', (part: Part) => new EndPage(part));
