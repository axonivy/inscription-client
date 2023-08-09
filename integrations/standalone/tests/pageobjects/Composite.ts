import { Locator, Page } from '@playwright/test';
import { MacroEditor, ScriptArea, ScriptInput } from './CodeEditor';
import { ResponsibleSelect } from './ResponsibleSelect';
import { Select } from './Select';
import { ColumnType, Table } from './Table';
import { Checkbox } from './Checkbox';
import { TextArea } from './TextArea';
import { Tags } from './Tags';
import { Combobox } from './Combobox';

export abstract class Composite {
  readonly page: Page;
  protected readonly locator: Locator;

  constructor(page: Page, locator: Locator) {
    this.page = page;
    this.locator = locator;
  }

  textArea(label: string) {
    return new TextArea(this.locator, label);
  }

  checkbox(label: string) {
    return new Checkbox(this.locator, label);
  }

  select(label: string) {
    return new Select(this.page, this.locator, { label });
  }

  combobox(label: string) {
    return new Combobox(this.page, this.locator, label);
  }

  responsibleSelect(label: string) {
    return new ResponsibleSelect(this.page, this.locator, label);
  }

  macroInput(label: string) {
    return new MacroEditor(this.page, this.locator, label);
  }

  macroArea(label: string) {
    return new MacroEditor(this.page, this.locator, label);
  }

  scriptInput(label: string) {
    return new ScriptInput(this.page, this.locator, label);
  }

  scriptArea() {
    return new ScriptArea(this.page, this.locator);
  }

  table(columns: ColumnType[]) {
    return new Table(this.page, this.locator, columns);
  }

  tags(): any {
    return new Tags(this.page, this.locator);
  }

  currentLocator() {
    return this.locator;
  }
}
