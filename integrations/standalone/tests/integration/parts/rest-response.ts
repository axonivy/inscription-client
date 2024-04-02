import type { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import type { Section } from '../../pageobjects/Section';
import type { Table } from '../../pageobjects/Table';
import type { ScriptArea } from '../../pageobjects/CodeEditor';
import type { Combobox } from '../../pageobjects/Combobox';

class RestResponse extends PartObject {
  typeSection: Section;
  type: Combobox;
  mappingSection: Section;
  mapping: Table;
  codeSection: Section;
  code: ScriptArea;
  errorSection: Section;
  clientError: Combobox;
  statusError: Combobox;

  constructor(part: Part) {
    super(part);
    this.typeSection = part.section('Result Type');
    this.type = this.typeSection.combobox('Read body as type (result variable)');
    this.mappingSection = part.section('Mapping');
    this.mapping = this.mappingSection.table(['label', 'expression']);
    this.codeSection = part.section('Code');
    this.code = this.codeSection.scriptArea();
    this.errorSection = part.section('Error');
    this.clientError = this.errorSection.combobox('On Error (Connection, Timeout, etc.)');
    this.statusError = this.errorSection.combobox('On Status Code not successful (2xx)');
  }

  async fill() {
    await this.typeSection.open();
    await this.type.fill('type');
    await this.mappingSection.open();
    await this.mapping.row(1).column(1).fill('"bla"');
    await this.codeSection.open();
    await this.code.fill('code');
    await this.errorSection.toggle();
    await this.clientError.choose('>> Ignore error');
    await this.statusError.choose('>> Ignore error');
  }

  async assertFill() {
    await this.type.expectValue('type');
    await this.mapping.row(1).column(1).expectValue('"bla"');
    await this.code.expectValue('code');
    await this.errorSection.expectIsOpen();
    await this.clientError.expectValue('>> Ignore error');
    await this.statusError.expectValue('>> Ignore error');
  }

  async clear() {
    await this.type.fill('');
    await this.mapping.row(1).column(1).clearExpression();
    await this.code.clear();
    await this.clientError.choose('ivy:error:rest:client');
    await this.statusError.choose('ivy:error:rest:client');
  }

  async assertClear() {
    await this.typeSection.expectIsClosed();
    await this.mappingSection.expectIsClosed();
    await this.codeSection.expectIsClosed();
    await this.errorSection.expectIsClosed();
  }
}

export const RestResponseTest = new NewPartTest('Response', (part: Part) => new RestResponse(part));
