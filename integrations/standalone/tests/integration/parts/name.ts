import { Part } from '../../pageobjects/Part';
import { Section } from '../../pageobjects/Section';
import { Table } from '../../pageobjects/Table';
import { Tags } from '../../pageobjects/Tags';
import { TextArea } from '../../pageobjects/TextArea';
import { NewPartTest, PartObject } from './part-tester';

class Name extends PartObject {
  displayName: TextArea;
  description: TextArea;
  meansDocumentsSection: Section;
  documents: Table;
  tagsSection: Section;
  tags: Tags;

  constructor(part: Part, private readonly hasTags: boolean) {
    super(part);
    this.displayName = part.textArea('Display name');
    this.description = part.textArea('Description');
    this.meansDocumentsSection = part.section('Means / Documents');
    this.documents = this.meansDocumentsSection.table(['text', 'text']);
    this.tagsSection = part.section('Tags');
    this.tags = this.tagsSection.tags();
  }

  async fill() {
    await this.displayName.fill('test name');
    await this.description.fill('test desc');
    await this.meansDocumentsSection.toggle();
    const row = await this.documents.addRow();
    await row.fill(['test doc', 'test url']);
    if (this.hasTags) {
      await this.tagsSection.toggle();
      await this.tags.addTags(['abc', 'efg']);
    }
  }

  async assertFill() {
    await this.displayName.expectValue('test name');
    await this.description.expectValue('test desc');
    await this.documents.expectRowCount(1);
    await this.documents.row(0).expectValues(['test doc', 'test url']);
    if (this.hasTags) {
      await this.tags.expectTags(['abc', 'efg']);
    }
  }
  async clear() {
    await this.displayName.clear();
    await this.description.clear();
    await this.documents.clear();
    if (this.hasTags) {
      await this.tags.clearTags(['abc', 'efg']);
    }
  }
  async assertClear() {
    await this.displayName.expectEmpty();
    await this.description.expectEmpty();
    await this.meansDocumentsSection.expectIsClosed();
    if (this.hasTags) {
      await this.tags.expectEmpty();
    }
  }
}

export class NameTester extends NewPartTest {
  constructor(hasTags: boolean = true) {
    super('Name', (part: Part) => new Name(part, hasTags));
  }
}

export const NameTest = new NameTester();
export const NameTestWithoutTags = new NameTester(false);
