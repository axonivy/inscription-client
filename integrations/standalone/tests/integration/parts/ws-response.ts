import { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import { Section } from '../../pageobjects/Section';
import { Select } from '../../pageobjects/Select';
import { Table } from '../../pageobjects/Table';
import { ScriptArea } from '../../pageobjects/CodeEditor';

class WsResponse extends PartObject {
  mapping: Table;
  code: ScriptArea;
  errorSection: Section;
  exception: Select;

  constructor(part: Part) {
    super(part);
    this.mapping = part.table(['label', 'label', 'expression']);
    this.code = part.scriptArea();
    this.errorSection = part.section('Error');
    this.exception = this.errorSection.select();
  }

  async fill() {
    await this.mapping.row(1).column(2).fill('"bla"');
    await this.code.fill('code');
    await this.errorSection.toggle();
    await this.exception.choose('>> Ignore Exception');
  }

  async assertFill() {
    await this.mapping.row(1).column(2).expectValue('"bla"');
    await this.code.expectValue('code');
    await this.errorSection.expectIsOpen();
    await this.exception.expectValue('>> Ignore Exception');
  }

  async clear() {
    await this.mapping.row(1).column(2).fill('');
    await this.code.clear();
    await this.exception.choose('ivy:error:webservice:exception');
  }

  async assertClear() {
    await this.mapping.row(1).column(2).expectValue('');
    await this.code.expectValue('');
    await this.errorSection.expectIsClosed();
  }
}

export const WsResponseTest = new NewPartTest('Response', (part: Part) => new WsResponse(part));
