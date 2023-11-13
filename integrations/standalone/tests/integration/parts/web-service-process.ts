import type { Part } from '../../pageobjects/Part';
import type { RadioGroup } from '../../pageobjects/RadioGroup';
import type { TextArea } from '../../pageobjects/TextArea';
import { NewPartTest, PartObject } from './part-tester';

class WsProcessPart extends PartObject {
  authentication: RadioGroup;
  qualifiedName: TextArea;

  constructor(part: Part) {
    super(part);
    this.authentication = part.radioGroup();
    this.qualifiedName = part.textArea('Qualified name');
  }

  async fill() {
    await this.authentication.choose('WS Security');
    await this.qualifiedName.fill('test');
  }

  async assertFill() {
    await this.authentication.expectSelected('WS Security');
    await this.qualifiedName.expectValue('test');
  }

  async clear() {
    await this.authentication.choose('None/Container');
    await this.qualifiedName.clear();
  }

  async assertClear() {
    await this.authentication.expectSelected('None/Container');
    await this.qualifiedName.expectEmpty();
  }
}

export const WebServiceProcessTest = new NewPartTest('Web Service Process', (part: Part) => new WsProcessPart(part));
