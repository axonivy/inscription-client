import type { ScriptArea } from '../../pageobjects/CodeEditor';
import type { Part } from '../../pageobjects/Part';
import type { Section } from '../../pageobjects/Section';
import type { Table } from '../../pageobjects/Table';
import { NewPartTest, PartObject } from './part-tester';

class Result extends PartObject {
  paramSection: Section;
  params: Table;
  mapping: Table;
  code: ScriptArea;

  constructor(part: Part, private readonly hideParamDesc: boolean = false) {
    super(part);
    this.paramSection = part.section('Result parameters');
    if (this.hideParamDesc) {
      this.params = this.paramSection.table(['text', 'text']);
    } else {
      this.params = this.paramSection.table(['text', 'text', 'text']);
    }
    this.mapping = part.table(['text', 'expression']);
    this.code = part.scriptArea();
  }

  async fill() {
    await this.paramSection.toggle();
    const paramRow = await this.params.addRow();
    if (this.hideParamDesc) {
      await paramRow.fill(['param', 'String']);
    } else {
      await paramRow.fill(['param', 'String', 'desc']);
    }
    await this.paramSection.toggle();
    await this.mapping.row(1).column(1).fill('"bla"');
    await this.code.fill('code');
  }

  async assertFill() {
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
    await this.paramSection.toggle();
    await this.params.clear();
    await this.paramSection.toggle();
    await this.mapping.row(0).column(1).fill('');
    await this.code.clear();
  }

  async assertClear() {
    await this.paramSection.toggle();
    await this.params.expectEmpty();
    await this.paramSection.toggle();
    await this.mapping.row(0).column(1).expectEmpty();
    await this.code.expectEmpty();
  }
}

export const ResultTest = new NewPartTest('Result', (part: Part) => new Result(part));
export const MethodResultTest = new NewPartTest('Result', (part: Part) => new Result(part, true));
