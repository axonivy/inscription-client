import { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import { Checkbox } from '../../pageobjects/Checkbox';
import { MacroEditor } from '../../pageobjects/CodeEditor';
import { Section } from '../../pageobjects/Section';
import { Table } from '../../pageobjects/Table';
import { Select } from '../../pageobjects/Select';

class Request extends PartObject {
  httpable: Checkbox;
  startList: Checkbox;
  name: MacroEditor;
  description: MacroEditor;
  category: MacroEditor;
  customFieldSection: Section;
  customFields: Table;
  permissionSection: Section;
  anonym: Checkbox;
  role: Select;
  error: Select;

  constructor(part: Part) {
    super(part);
    this.httpable = part.checkbox('Yes, this can be started with a HTTP-Request / -Link');
    this.startList = part.checkbox('Start list');
    this.name = part.macroInput('Name');
    this.description = part.macroArea('Description');
    this.category = part.macroInput('Category');
    this.customFieldSection = part.section('Custom Fields');
    this.customFields = this.customFieldSection.table(['text', 'expression']);
    this.permissionSection = part.section('Permission');
    this.anonym = this.permissionSection.checkbox('Anonymous');
    this.role = this.permissionSection.select('Role');
    this.error = this.permissionSection.select('Violation error');
  }

  async fill() {
    await this.startList.uncheck();
    await this.name.fill('name');
    await this.description.fill('desc');
    await this.category.fill('cat');
    await this.customFieldSection.toggle();
    const customField = await this.customFields.addRow();
    await customField.fill(['field', 'value']);
    await this.permissionSection.toggle();
    await this.anonym.uncheck();
    await this.role.choose('SYSTEM');
    await this.error.choose('>> Ignore Exception');
    await this.httpable.uncheck();
  }

  async assertFill() {
    await this.httpable.expectUnchecked();
    await this.httpable.check();
    await this.startList.expectUnchecked();
    await this.name.expectValue('name');
    await this.description.expectValue('desc');
    await this.category.expectValue('cat');
    await this.customFieldSection.expectIsOpen();
    await this.customFields.row(0).expectValues(['field', 'value']);
    await this.permissionSection.expectIsOpen();
    await this.anonym.expectUnchecked();
    await this.role.expectValue('SYSTEM');
    await this.error.expectValue('>> Ignore Exception');
  }

  async clear() {
    await this.httpable.expectChecked();
    await this.startList.check();
    await this.name.clear();
    await this.description.clear();
    await this.category.clear();
    await this.customFields.clear();
    await this.role.choose('Everybody');
    await this.anonym.check();
    await this.error.choose('ivy:security:forbidden');
  }

  async assertClear() {
    await this.httpable.expectChecked();
    await this.startList.expectChecked();
    await this.name.expectEmpty();
    await this.description.expectEmpty();
    await this.category.expectEmpty();
    await this.customFieldSection.expectIsClosed();
    await this.permissionSection.expectIsClosed();
  }
}

export const RequestTest = new NewPartTest('Request', (part: Part) => new Request(part));
