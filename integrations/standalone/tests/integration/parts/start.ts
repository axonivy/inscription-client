import type { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import type { Section } from '../../pageobjects/Section';
import type { Table } from '../../pageobjects/Table';
import type { ScriptArea } from '../../pageobjects/CodeEditor';
import type { TextArea } from '../../pageobjects/TextArea';

class Start extends PartObject {
  signatureSection: Section;
  signature: TextArea;
  paramSection: Section;
  params: Table;
  mappingSection: Section;
  mapping: Table;
  codeSection: Section;
  code: ScriptArea;

  constructor(part: Part, private readonly hideParamDesc: boolean = false) {
    super(part);
    this.signatureSection = part.section('Signature');
    this.signature = this.signatureSection.textArea({});
    this.paramSection = part.section('Input parameters');
    if (this.hideParamDesc) {
      this.params = this.paramSection.table(['text', 'text']);
    } else {
      this.params = this.paramSection.table(['text', 'text', 'text']);
    }
    this.mappingSection = part.section('Mapping');
    this.mapping = this.mappingSection.table(['text', 'expression']);
    this.codeSection = part.section('Code');
    this.code = this.codeSection.scriptArea();
  }

  async fill() {
    await this.signatureSection.open();
    await this.signature.fill('myStart');
    await this.paramSection.toggle();
    const paramRow = await this.params.addRow();
    if (this.hideParamDesc) {
      await paramRow.fill(['param', 'String']);
    } else {
      await paramRow.fill(['param', 'String', 'desc']);
    }
    await this.paramSection.toggle();
    await this.mappingSection.open();
    await this.mapping.row(1).column(1).fill('"bla"');
    await this.codeSection.open();
    await this.code.fill('code');
  }

  async assertFill() {
    await this.signature.expectValue('myStart');
    await this.paramSection.toggle();
    const paramRow = this.params.row(0);
    if (this.hideParamDesc) {
      await paramRow.expectValues(['param', 'String']);
    } else {
      await paramRow.expectValues(['param', 'String', 'desc']);
    }
    await this.paramSection.toggle();
    await this.mapping.row(1).column(1).expectValue('"bla"');
    await this.code.expectValue('code');
  }

  async clear() {
    await this.signature.clear();
    await this.paramSection.toggle();
    await this.params.clear();
    await this.paramSection.toggle();
    await this.mapping.row(1).column(1).clearExpression();
    await this.code.clear();
  }

  async assertClear() {
    await this.signature.expectEmpty();
    await this.paramSection.toggle();
    await this.params.expectEmpty();
    await this.paramSection.toggle();
    await this.mappingSection.expectIsClosed();
    await this.codeSection.expectIsClosed();
  }
}

export const StartTest = new NewPartTest('Start', (part: Part) => new Start(part));
export const MethodStartTest = new NewPartTest('Start', (part: Part) => new Start(part, true));
