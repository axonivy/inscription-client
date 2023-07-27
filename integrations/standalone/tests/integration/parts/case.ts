import { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import { CodeEditor } from '../../pageobjects/CodeEditor';
import { Section } from '../../pageobjects/Section';
import { Table } from '../../pageobjects/Table';

class Case extends PartObject {
  name: CodeEditor;
  description: CodeEditor;
  category: CodeEditor;
  customSection: Section;
  customFields: Table;

  constructor(part: Part) {
    super(part);
    this.name = part.macroInput('Name');
    this.description = part.macroArea('Description');
    this.category = part.macroInput('Category');

    this.customSection = part.section('Custom Fields');
    this.customFields = this.customSection.table(['text', 'label', 'expression']);
  }

  async fill() {
    await this.name.fill('case name');
    await this.description.fill('case desc');
    await this.category.fill('case cat');

    await this.customSection.toggle();
    const row = await this.customFields.addRow();
    await row.fill(['cf', 'value']);
  }

  async assertFill() {
    await this.name.expectValue('case name');
    await this.description.expectValue('case desc');
    await this.category.expectValue('case cat');
    await this.customFields.row(0).expectValues(['cf', 'value']);
  }

  async clear() {
    await this.name.clear();
    await this.description.clear();
    await this.category.clear();
    await this.customFields.clear();
  }

  async assertClear() {
    await this.name.expectEmpty();
    await this.description.expectEmpty();
    await this.category.expectEmpty;
    await this.customSection.expectIsClosed();
  }
}

export const CaseTest = new NewPartTest('Case', (part: Part) => new Case(part));
