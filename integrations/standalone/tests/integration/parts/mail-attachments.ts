import { Part } from '../../pageobjects/Part';
import { PartTest } from './part-tester';

export class MailAttachmentTester implements PartTest {
  partName() {
    return 'Attachments';
  }
  async fill(part: Part) {
    const row = await part.table().addRow();
    await row.fill(['hi']);
  }
  async assertFill(part: Part) {
    await part.table().row(0).column(0).expectValue('hi');
  }
  async clear(part: Part) {
    await part.table().clear();
  }
  async assertClear(part: Part) {
    await part.table().expectRowCount(0);
  }
}

export const MailAttachmentTest = new MailAttachmentTester();
