import type { QueryKind } from '@axonivy/inscription-protocol';
import type { Combobox } from '../../pageobjects/Combobox';
import type { Part } from '../../pageobjects/Part';
import type { Select } from '../../pageobjects/Select';
import { NewPartTest, PartObject } from './part-tester';
import type { Section } from '../../pageobjects/Section';
import type { Checkbox } from '../../pageobjects/Checkbox';
import type { Table } from '../../pageobjects/Table';
import type { MacroEditor, ScriptInput } from '../../pageobjects/CodeEditor';

class TablePart extends PartObject {
  table: Combobox;

  constructor(part: Part) {
    super(part);
    this.table = part.combobox('Table');
  }

  async fill(): Promise<void> {
    await this.table.choose('IWA_APPLICATION');
  }
  async assertFill(): Promise<void> {
    await this.table.expectValue('IWA_APPLICATION');
  }
  async clear(): Promise<void> {}
  async assertClear(): Promise<void> {}
}

class DefinitionPart extends PartObject {
  section: Section;
  query: MacroEditor;
  quote: Checkbox;

  constructor(part: Part) {
    super(part);
    this.section = part.section('Definition');
    this.query = this.section.macroArea();
    this.quote = this.section.checkbox('Quote ivyScript variables');
  }

  async fill(): Promise<void> {
    await this.section.expectIsClosed();
    await this.section.toggle();
    await this.query.fill('code');
    await this.quote.click();
  }
  async assertFill(): Promise<void> {
    await this.section.expectIsOpen();
    await this.query.expectValue('code');
    await this.quote.expectChecked();
  }
  async clear(): Promise<void> {
    await this.query.clear();
    await this.quote.click();
  }
  async assertClear(): Promise<void> {
    await this.section.expectIsClosed();
  }
}

class FieldsReadPart extends PartObject {
  section: Section;
  all: Checkbox;
  table: Table;

  constructor(part: Part) {
    super(part);
    this.section = part.section('Fields');
    this.all = this.section.checkbox('Select all fields');
    this.table = this.section.table(['label', 'label']);
  }

  async fill(): Promise<void> {
    await this.section.expectIsClosed();
    await this.section.toggle();
    await this.all.click();
    await this.table.row(1).locator.click();
  }
  async assertFill(): Promise<void> {
    await this.section.expectIsOpen();
    await this.all.expectUnchecked();
    await this.table.row(1).expectValues(['NAME', '✅']);
  }
  async clear(): Promise<void> {
    await this.all.click();
  }
  async assertClear(): Promise<void> {
    await this.section.expectIsClosed();
  }
}

class FieldsPart extends PartObject {
  section: Section;
  table: Table;

  constructor(part: Part) {
    super(part);
    this.section = part.section('Fields');
    this.table = this.section.table(['label', 'expression']);
  }

  async fill(): Promise<void> {
    await this.section.expectIsClosed();
    await this.section.toggle();
    await this.table.row(1).fill(['test']);
  }
  async assertFill(): Promise<void> {
    await this.section.expectIsOpen();
    await this.table.row(1).expectValues(['test']);
  }
  async clear(): Promise<void> {
    await this.table.row(1).fill(['']);
  }
  async assertClear(): Promise<void> {
    await this.section.expectIsClosed();
  }
}

class ConditionPart extends PartObject {
  section: Section;
  condition: MacroEditor;

  constructor(part: Part) {
    super(part);
    this.section = part.section('Condition');
    this.condition = this.section.macroArea();
  }

  async fill(): Promise<void> {
    await this.section.expectIsClosed();
    await this.section.toggle();
    await this.condition.fill('code');
  }
  async assertFill(): Promise<void> {
    await this.section.expectIsOpen();
    await this.condition.expectValue('code');
  }
  async clear(): Promise<void> {
    await this.condition.clear();
  }
  async assertClear(): Promise<void> {
    await this.section.expectIsClosed();
  }
}

class SortPart extends PartObject {
  section: Section;
  sort: Table;

  constructor(part: Part) {
    super(part);
    this.section = part.section('Sort');
    this.sort = this.section.table(['select', 'select']);
  }

  async fill(): Promise<void> {
    await this.section.expectIsClosed();
    await this.section.toggle();
    const row = await this.sort.addRow();
    await row.fill(['NAME', 'DESCENDING']);
  }
  async assertFill(): Promise<void> {
    await this.section.expectIsOpen();
    await this.sort.row(0).expectValues(['NAME', 'DESCENDING']);
  }
  async clear(): Promise<void> {
    await this.sort.clear();
  }
  async assertClear(): Promise<void> {
    await this.section.expectIsClosed();
  }
}

class LimitPart extends PartObject {
  section: Section;
  limit: ScriptInput;
  offset: ScriptInput;

  constructor(part: Part) {
    super(part);
    this.section = part.section('Limit');
    this.limit = this.section.scriptInput('Lot size');
    this.offset = this.section.scriptInput('Start index');
  }

  async fill(): Promise<void> {
    await this.section.expectIsClosed();
    await this.section.toggle();
    await this.limit.fill('123');
    await this.offset.fill('456');
  }
  async assertFill(): Promise<void> {
    await this.section.expectIsOpen();
    await this.limit.expectValue('123');
    await this.offset.expectValue('456');
  }
  async clear(): Promise<void> {
    await this.limit.fill('2147483647');
    await this.offset.fill('0');
  }
  async assertClear(): Promise<void> {
    await this.section.expectIsClosed();
  }
}

class ErrorPart extends PartObject {
  section: Section;
  error: Select;

  constructor(part: Part) {
    super(part);
    this.section = part.section('Error');
    this.error = this.section.select();
  }

  async fill(): Promise<void> {
    await this.section.expectIsClosed();
    await this.section.toggle();
    await this.error.choose('>> Ignore Exception');
  }
  async assertFill(): Promise<void> {
    await this.section.expectIsOpen();
    await this.error.expectValue('>> Ignore Exception');
  }
  async clear(): Promise<void> {
    await this.error.choose('ivy:error:database');
  }
  async assertClear(): Promise<void> {
    await this.section.expectIsClosed();
  }
}

class Query extends PartObject {
  kind: Select;
  database: Select;
  table: TablePart;
  readFields: FieldsReadPart;
  fields: FieldsPart;
  condition: ConditionPart;
  sort: SortPart;
  limit: LimitPart;
  error: ErrorPart;
  definition: DefinitionPart;

  constructor(part: Part, private readonly queryKind: QueryKind) {
    super(part);
    this.kind = part.select('Query Kind');
    this.database = part.select('Database');
    this.table = new TablePart(part);
    this.definition = new DefinitionPart(part);
    this.readFields = new FieldsReadPart(part);
    this.fields = new FieldsPart(part);
    this.condition = new ConditionPart(part);
    this.sort = new SortPart(part);
    this.limit = new LimitPart(part);
    this.error = new ErrorPart(part);
  }

  tests() {
    switch (this.queryKind) {
      case 'READ':
        return [this.table, this.readFields, this.condition, this.sort, this.limit, this.error];
      case 'WRITE':
        return [this.table, this.fields, this.error];
      case 'UPDATE':
        return [this.table, this.fields, this.condition, this.error];
      case 'DELETE':
        return [this.table, this.condition, this.error];
      case 'ANY':
        return [this.definition, this.limit, this.error];
    }
  }

  async fill() {
    await this.kind.choose(this.queryKind);
    await this.database.choose('IvySystemDatabase');
    for (const test of this.tests()) {
      await test.fill();
    }
  }

  async assertFill() {
    await this.kind.expectValue(this.queryKind);
    await this.database.expectValue('IvySystemDatabase');
    for (const test of this.tests()) {
      await test.assertFill();
    }
  }

  async clear() {
    for (const test of this.tests()) {
      await test.clear();
    }
  }

  async assertClear() {
    for (const test of this.tests()) {
      await test.assertClear();
    }
  }
}

export const QueryReadTest = new NewPartTest('Query', (part: Part) => new Query(part, 'READ'));
export const QueryWriteTest = new NewPartTest('Query', (part: Part) => new Query(part, 'WRITE'));
export const QueryUpdateTest = new NewPartTest('Query', (part: Part) => new Query(part, 'UPDATE'));
export const QueryDeleteTest = new NewPartTest('Query', (part: Part) => new Query(part, 'DELETE'));
export const QueryAnyTest = new NewPartTest('Query', (part: Part) => new Query(part, 'ANY'));
