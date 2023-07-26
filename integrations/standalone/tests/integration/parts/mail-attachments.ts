import { Part } from '../../pageobjects/Part';
import { Table } from '../../pageobjects/Table';
import { PartTest } from './part-tester';

class Attachements {
  table: Table;
  constructor(part: Part) {
    this.table = part.table(['text']);
  }
}

export class MailAttachmentTester implements PartTest {
  partName() {
    return 'Attachments';
  }
  async fill(part: Part) {
    const table = new Attachements(part).table;
    const row = await table.addRow();
    await row.fill(['hi']);
  }
  async assertFill(part: Part) {
    const table = new Attachements(part).table;
    await table.row(0).column(0).expectValue('hi');
  }
  async clear(part: Part) {
    const table = new Attachements(part).table;
    await table.clear();
  }
  async assertClear(part: Part) {
    const table = new Attachements(part).table;
    await table.expectRowCount(0);
  }
}

export const MailAttachmentTest = new MailAttachmentTester();
