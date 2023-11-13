import type { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import type { TextArea } from '../../pageobjects/TextArea';

class EndPage extends PartObject {
  endPage: TextArea;

  constructor(part: Part) {
    super(part);
    this.endPage = part.textArea('Display the following page');
  }

  async fill() {
    await this.endPage.fill('page.xhtml');
  }

  async assertFill() {
    await this.endPage.expectValue('page.xhtml');
  }

  async clear() {
    await this.endPage.clear();
  }

  async assertClear() {
    await this.endPage.expectEmpty();
  }
}

export const EndPageTest = new NewPartTest('End Page', (part: Part) => new EndPage(part));
