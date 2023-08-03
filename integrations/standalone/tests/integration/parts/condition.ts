import { Part } from '../../pageobjects/Part';
import { Table } from '../../pageobjects/Table';
import { NewPartTest, PartObject } from './part-tester';

class Condition extends PartObject {
  table: Table;
  constructor(part: Part) {
    super(part);
    this.table = part.table(['label', 'expression']);
  }

  async fill() {
    const row = this.table.row(1);
    await row.fill(['"bla"']);

    await this.table.row(0).dragTo(this.table.row(1));
  }

  async assertFill() {
    await this.table.row(0).expectValues(['"bla"']);
    await this.table.row(1).expectValues(['false']);
  }

  async clear() {
    await this.table.row(0).fill(['']);
    await this.table.row(0).dragTo(this.table.row(1));
  }

  async assertClear() {
    await this.table.row(0).expectValues(['false']);
    await this.table.row(1).expectValues(['']);
  }
}

export const ConditionTest = new NewPartTest('Condition', (part: Part) => new Condition(part));
