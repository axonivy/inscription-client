import { Locator, Page } from '@playwright/test';
import { CodeEditor } from './CodeEditor';
import { ResponsibleSelect } from './ResponsibleSelect';
import { Select } from './Select';
import { Table } from './Table';
import { Checkbox } from './Checkbox';
import { TextArea } from './TextArea';
import { Tags } from './Tags';

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
    return new Select(this.page, this.locator, label);
  }

  responsibleSelect(label: string) {
    return new ResponsibleSelect(this.page, this.locator, label);
  }

  macroInput(label: string) {
    return new CodeEditor(this.page, this.locator, true, label);
  }

  macroArea(label: string) {
    return new CodeEditor(this.page, this.locator, true, label);
  }

  scriptInput(label: string) {
    return new CodeEditor(this.page, this.locator, true, label);
  }

  scriptArea() {
    return new CodeEditor(this.page, this.locator, false);
  }

  table() {
    return new Table(this.page, this.locator);
  }

  tags(): any {
    return new Tags(this.page, this.locator);
  }
}
