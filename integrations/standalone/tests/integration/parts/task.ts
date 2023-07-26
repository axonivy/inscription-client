import { Accordion } from '../../pageobjects/Accordion';
import { PartTest } from './part-tester';
import { Part } from '../../pageobjects/Part';
import { CodeEditor } from '../../pageobjects/CodeEditor';
import { Section } from '../../pageobjects/Section';
import { ResponsibleSelect } from '../../pageobjects/ResponsibleSelect';
import { Select } from '../../pageobjects/Select';
import { Table } from '../../pageobjects/Table';
import { Checkbox } from '../../pageobjects/Checkbox';

export class TasksTester implements PartTest {
  private tasks: { tab: string; test: PartTest }[];
  constructor(private readonly error: RegExp = /EventAndGateway/) {
    this.tasks = [
      { tab: 'TaskA', test: new TaskTester({ name: 'task1', error: this.error }) },
      { tab: 'TaskB', test: new TaskTester({ name: 'task2', error: this.error }) }
    ];
  }
  partName() {
    return 'Tasks';
  }
  async fill(part: Part) {
    for (const task of this.tasks) {
      const tab = (part as Accordion).tab(task.tab);
      await tab.switchTo();
      await task.test.fill(tab);
    }
  }
  async assertFill(part: Part) {
    for (const task of this.tasks) {
      const tab = (part as Accordion).tab(task.tab);
      tab.switchTo();
      await task.test.assertFill(tab);
    }
  }
  async clear(part: Part) {
    for (const task of this.tasks) {
      const tab = (part as Accordion).tab(task.tab);
      tab.switchTo();
      await task.test.clear(tab);
    }
  }
  async assertClear(part: Part) {
    for (const task of this.tasks) {
      const tab = (part as Accordion).tab(task.tab);
      tab.switchTo();
      await task.test.assertClear(tab);
    }
  }
}

class Task {
  name: CodeEditor;
  description: CodeEditor;
  category: CodeEditor;
  responsible: ResponsibleSelect;
  priority: Select;
  optionsSection: Section;
  skipTasklist: Checkbox;
  delay: CodeEditor;
  expirySection: Section;
  timeout: CodeEditor;
  error: Select;
  expiryResponsbile: ResponsibleSelect;
  expiryPriority: Select;
  customFieldsSection: Section;
  customFields: Table;
  codeSection: Section;
  code: CodeEditor;
  constructor(part: Part) {
    this.name = part.macroInput('Name');
    this.description = part.macroArea('Description');
    this.category = part.macroInput('Category');
    this.responsible = part.responsibleSelect('Responsible');
    this.priority = part.select('Priority');
    this.optionsSection = part.section('Options');
    this.skipTasklist = this.optionsSection.checkbox('Skip Tasklist');
    this.delay = this.optionsSection.scriptInput('Delay');
    this.expirySection = part.section('Expiry');
    this.timeout = this.expirySection.scriptInput('Timeout');
    this.error = this.expirySection.select('Error');
    this.expiryResponsbile = this.expirySection.responsibleSelect('Responsible');
    this.expiryPriority = this.expirySection.select('Priority');
    this.customFieldsSection = part.section('Custom fields');
    this.customFields = this.customFieldsSection.table(['text', 'label', 'expression']);
    this.codeSection = part.section('Code');
    this.code = this.codeSection.scriptArea();
  }
}

export class TaskTester implements PartTest {
  private name: string = 'test name';
  private error: RegExp = /f8/;
  constructor(options?: { name?: string; error?: RegExp }) {
    if (options?.name) {
      this.name = options.name;
    }
    if (options?.error) {
      this.error = options.error;
    }
  }

  partName() {
    return 'Task';
  }

  async fill(part: Part) {
    const task = new Task(part);
    await task.name.fill(this.name);
    await task.description.fill('test desc');
    await task.category.fill('test cat');

    await task.responsible.chooseType('Role from Attr.');
    await task.responsible.fill('"Teamleader"');

    await task.priority.choose('High');

    await task.optionsSection.toggle();
    await task.skipTasklist.check();
    await task.delay.fill('delay');

    await task.expirySection.toggle();
    await task.timeout.fill('timeout');
    await task.error.choose(this.error);
    await task.expiryResponsbile.chooseType('Nobody & delete');
    await task.expiryPriority.choose('Low');

    await task.customFieldsSection.toggle();
    const row = await task.customFields.addRow();
    await row.fill(['cf', 'value']);

    await task.codeSection.toggle();
    await task.code.fill('code');
  }

  async assertFill(part: Part) {
    const task = new Task(part);
    await task.name.expectValue(this.name);
    await task.description.expectValue('test desc');
    await task.category.expectValue('test cat');

    await task.responsible.expectType('Role from Attr.');
    await task.responsible.expectValue('"Teamleader"');

    await task.priority.expectValue(/High/);

    await task.skipTasklist.expectChecked();
    await task.delay.expectValue('delay');

    await task.timeout.expectValue('timeout');
    await task.error.expectValue(this.error);
    await task.expiryResponsbile.expectType('Nobody & delete');
    await task.expiryPriority.expectValue(/Low/);

    await task.customFields.expectRowCount(1);
    await task.customFields.cell(0, 0).expectValue('cf');
    await task.customFields.cell(0, 2).expectValue('value');

    await task.code.expectValue('code');
  }

  async clear(part: Part) {
    const task = new Task(part);
    await task.name.clear();
    await task.description.clear();
    await task.category.clear();

    await task.responsible.clear();

    await task.priority.choose('Normal');

    await task.skipTasklist.uncheck();
    await task.delay.clear();

    await task.timeout.clear();

    await task.customFields.clear();

    await task.code.clear();
  }

  async assertClear(part: Part) {
    const task = new Task(part);
    await task.name.expectEmpty();
    await task.description.expectEmpty();
    await task.category.expectEmpty();

    await task.responsible.expectType('Role');
    await task.responsible.expectValue('Everybody');

    await task.priority.expectValue('Normal');

    await task.optionsSection.isClosed();
    await task.expirySection.isClosed();
    await task.customFieldsSection.isClosed();
    await task.codeSection.isClosed();
  }
}

export const TaskTest = new TaskTester();

export const TasksTest = new TasksTester();
