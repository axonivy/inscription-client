import type { ScriptArea } from '../../pageobjects/CodeEditor';
import type { Part } from '../../pageobjects/Part';
import type { Table } from '../../pageobjects/Table';
import { NewPartTest, PartObject } from './part-tester';

class Output extends PartObject {
  mapping: Table;
  code: ScriptArea;

  constructor(part: Part, private readonly hasCode: boolean = true) {
    super(part);
    this.mapping = part.table(['text', 'expression']);
    this.code = part.scriptArea();
  }

  async fill() {
    await this.mapping.row(1).column(1).fill('"bla"');
    if (this.hasCode) {
      await this.code.fill('code');
    }
  }

  async assertFill() {
    await this.mapping.row(1).column(1).expectValue('"bla"');
    if (this.hasCode) {
      await this.code.expectValue('code');
    }
  }

  async clear() {
    await this.mapping.row(1).column(1).fill('');
    if (this.hasCode) {
      await this.code.clear();
    }
  }

  async assertClear() {
    await this.mapping.row(1).column(1).expectEmpty();
    if (this.hasCode) {
      await this.code.expectEmpty();
    }
  }
}

export const OutputTest = new NewPartTest('Output', (part: Part) => new Output(part));
export const ScriptOutputTest = new NewPartTest('Output', (part: Part) => new Output(part, false));
