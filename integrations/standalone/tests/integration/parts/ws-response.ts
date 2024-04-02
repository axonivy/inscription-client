import type { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import type { Section } from '../../pageobjects/Section';
import type { Select } from '../../pageobjects/Select';
import type { Table } from '../../pageobjects/Table';
import type { ScriptArea } from '../../pageobjects/CodeEditor';

class WsResponse extends PartObject {
  mappingSection: Section;
  mapping: Table;
  codeSection: Section;
  code: ScriptArea;
  errorSection: Section;
  exception: Select;

  constructor(part: Part) {
    super(part);
    this.mappingSection = part.section('Mapping');
    this.mapping = this.mappingSection.table(['label', 'expression']);
    this.codeSection = part.section('Code');
    this.code = this.codeSection.scriptArea();
    this.errorSection = part.section('Error');
    this.exception = this.errorSection.select({});
  }

  async fill() {
    await this.mappingSection.open();
    await this.mapping.row(1).column(1).fill('"bla"');
    await this.codeSection.open();
    await this.code.fill('code');
    await this.errorSection.toggle();
    await this.exception.choose('>> Ignore Exception');
  }

  async assertFill() {
    await this.mapping.row(1).column(1).expectValue('"bla"');
    await this.code.expectValue('code');
    await this.errorSection.expectIsOpen();
    await this.exception.expectValue('>> Ignore Exception');
  }

  async clear() {
    await this.mapping.row(1).column(1).clearExpression();
    await this.code.clear();
    await this.exception.choose('ivy:error:webservice:exception');
  }

  async assertClear() {
    await this.mapping.row(1).column(1).expectValue('');
    await this.codeSection.expectIsClosed();
    await this.errorSection.expectIsClosed();
  }
}

export const WsResponseTest = new NewPartTest('Response', (part: Part) => new WsResponse(part));
