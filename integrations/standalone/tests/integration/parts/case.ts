import type { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import type { Section } from '../../pageobjects/Section';
import type { Table } from '../../pageobjects/Table';
import type { InfoComponent } from '../../pageobjects/InfoComponent';

class Case extends PartObject {
  info: InfoComponent;
  customSection: Section;
  customFields: Table;

  constructor(part: Part) {
    super(part);
    this.info = part.infoComponent();
    this.customSection = part.section('Custom Fields');
    this.customFields = this.customSection.table(['combobox', 'label', 'expression']);
  }

  async fill() {
    await this.info.fill();
    await this.customSection.toggle();
    const row = await this.customFields.addRow();
    await row.fill(['cf', '"value"']);
  }

  async assertFill() {
    await this.info.expectFill();
    await this.customFields.row(0).expectValues(['cf', '"value"']);
  }

  async clear() {
    await this.info.clear();
    await this.customFields.clear();
  }

  async assertClear() {
    await this.info.expectEmpty();
    await this.customSection.expectIsClosed();
  }
}

export const CaseTest = new NewPartTest('Case', (part: Part) => new Case(part));
