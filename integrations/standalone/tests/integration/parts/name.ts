import { Part } from '../../pageobjects/Part';
import { Section } from '../../pageobjects/Section';
import { Table } from '../../pageobjects/Table';
import { Tags } from '../../pageobjects/Tags';
import { TextArea } from '../../pageobjects/TextArea';
import { PartTest } from './part-tester';

class Name {
  displayName: TextArea;
  description: TextArea;
  meansDocumentsSection: Section;
  documents: Table;
  tagsSection: Section;
  tags: Tags;

  constructor(part: Part) {
    this.displayName = part.textArea('Display name');
    this.description = part.textArea('Description');
    this.meansDocumentsSection = part.section('Means / Documents');
    this.documents = this.meansDocumentsSection.table();
    this.tagsSection = part.section('Tags');
    this.tags = this.tagsSection.tags();
  }
}

export class NameTester implements PartTest {
  constructor(private readonly hasTags: boolean = true) {}

  partName() {
    return 'Name';
  }
  async fill(part: Part) {
    const name = new Name(part);
    await name.displayName.fill('test name');
    await name.description.fill('test desc');
    await name.meansDocumentsSection.toggle();
    const row = await name.documents.addRow();
    await row.fill(['test doc', 'test url']);
    if (this.hasTags) {
      await name.tagsSection.toggle();
      await name.tags.addTags(['abc', 'efg']);
    }
  }

  async assertFill(part: Part) {
    const name = new Name(part);
    await name.displayName.expectValue('test name');
    await name.description.expectValue('test desc');
    await name.documents.expectRowCount(1);
    await name.documents.row(0).expectValues(['test doc', 'test url']);
    if (this.hasTags) {
      await name.tags.expectTags(['abc', 'efg']);
    }
  }
  async clear(part: Part) {
    const name = new Name(part);
    await name.displayName.clear();
    await name.description.clear();
    await name.documents.clear();
    if (this.hasTags) {
      await name.tags.clearTags(['abc', 'efg']);
    }
  }
  async assertClear(part: Part) {
    const name = new Name(part);
    await name.displayName.expectEmpty();
    await name.description.expectEmpty();
    await name.meansDocumentsSection.isClosed();
    if (this.hasTags) {
      await name.tags.expectEmpty();
    }
  }
}

export const NameTest = new NameTester();
export const NameTestWithoutTags = new NameTester(false);
