import type { Part } from '../../pageobjects/Part';
import type { Section } from '../../pageobjects/Section';
import type { Table } from '../../pageobjects/Table';
import { NewPartTest, PartObject } from './part-tester';

class Attachements extends PartObject {
  section: Section;
  table: Table;

  constructor(part: Part) {
    super(part);
    this.section = part.section('Attachments');
    this.table = this.section.table(['expression']);
  }

  async fill() {
    await this.section.open();
    const row = await this.table.addRow();
    await row.fill(['hi']);
  }
  async assertFill() {
    await this.table.row(0).column(0).expectValue('hi');
  }
  async clear() {
    await this.table.row(0).remove(true);
  }
  async assertClear() {
    await this.section.expectIsClosed();
  }
}

export const MailAttachmentTest = new NewPartTest('Attachments', (part: Part) => new Attachements(part));
