import { Part } from '../../pageobjects/Part';
import { Table } from '../../pageobjects/Table';
import { PartTest } from './part-tester';

class Condition {
  table: Table;
  constructor(part: Part) {
    this.table = part.table(['label', 'expression']);
  }
}

export class ConditionTester implements PartTest {
  partName() {
    return 'Condition';
  }
  async fill(part: Part) {
    const condition = new Condition(part);
    const table = condition.table;
    const row = table.row(1);
    await row.fill(['"bla"']);

    await table.row(0).dragTo(table.row(1));
  }

  async assertFill(part: Part) {
    const condition = new Condition(part);
    const table = condition.table;
    await table.row(0).expectValues(['"bla"']);
    await table.row(1).expectValues(['false']);
  }

  async clear(part: Part) {
    const condition = new Condition(part);
    const table = condition.table;
    await table.row(0).fill(['']);
    await table.row(0).dragTo(table.row(1));
  }

  async assertClear(part: Part) {
    const condition = new Condition(part);
    const table = condition.table;
    await table.row(0).expectValues(['false']);
    await table.row(1).expectValues(['']);
  }
}

export const ConditionTest = new ConditionTester();
