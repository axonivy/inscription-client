import type { Part } from '../../pageobjects/Part';
import type { Section } from '../../pageobjects/Section';
import type { Table } from '../../pageobjects/Table';
import { NewPartTest, PartObject } from './part-tester';

class Attachements extends PartObject {
  table: Table;
  fieldset: Section;

  constructor(part: Part) {
    super(part);
    this.table = part.table(['expression']);
    this.fieldset = part.section('Attachments');
  }

  async fill() {
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
    await this.table.expectEmpty();
  }
}

export const MailAttachmentTest = new NewPartTest('Attachments', (part: Part) => new Attachements(part));
