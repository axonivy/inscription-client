import type { Accordion } from '../../pageobjects/Accordion';
import type { PartTest } from './part-tester';
import { NewPartTest, PartObject } from './part-tester';
import type { Part } from '../../pageobjects/Part';
import type { MacroEditor, ScriptArea, ScriptInput } from '../../pageobjects/CodeEditor';
import type { Section } from '../../pageobjects/Section';
import type { ResponsibleSelect } from '../../pageobjects/ResponsibleSelect';
import type { Select } from '../../pageobjects/Select';
import type { Table } from '../../pageobjects/Table';
import type { Checkbox } from '../../pageobjects/Checkbox';

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

type TaskTestOptions = { responsible: boolean; priority: boolean; expiry: boolean; options: 'persist' | 'list' | undefined };

class Task extends PartObject {
  name: MacroEditor;
  description: MacroEditor;
  category: MacroEditor;
  responsible: ResponsibleSelect;
  priority: Select;
  optionsSection: Section;
  skipTasklist: Checkbox;
  notification: Checkbox;
  delay: ScriptInput;
  persist: Checkbox;
  expirySection: Section;
  timeout: ScriptInput;
  error: Select;
  expiryResponsbile: ResponsibleSelect;
  expiryPriority: Select;
  customFieldsSection: Section;
  customFields: Table;
  codeSection: Section;
  code: ScriptArea;

  constructor(
    part: Part,
    private readonly nameValue = 'test name',
    private readonly errorValue = /f8/,
    private readonly options: TaskTestOptions = { responsible: true, priority: true, expiry: true, options: 'list' }
  ) {
    super(part);
    this.name = part.macroInput('Name');
    this.description = part.macroArea('Description');
    this.category = part.macroInput('Category');
    this.responsible = part.responsibleSelect('Responsible');
    this.priority = part.select('Priority');
    this.optionsSection = part.section('Options');
    this.skipTasklist = this.optionsSection.checkbox('Skip Tasklist');
    this.notification = this.optionsSection.checkbox('Suppress Notification');
    this.delay = this.optionsSection.scriptInput('Delay');
    this.persist = this.optionsSection.checkbox('Persist task on creation');
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

  async fill() {
    await this.name.fill(this.nameValue);
    await this.description.fill('test desc');
    await this.category.fill('test cat');

    if (this.options.responsible) {
      await this.responsible.chooseType('Role from Attr.');
      await this.responsible.fill('"Teamleader"');
    }

    if (this.options.priority) {
      await this.priority.choose('High');
    }

    if (this.options.options) {
      await this.optionsSection.toggle();
      if (this.options.options === 'persist') {
        await this.persist.click();
      } else {
        await this.skipTasklist.click();
        await this.notification.click();
        await this.delay.fill('delay');
      }
    }

    if (this.options.expiry) {
      await this.expirySection.toggle();
      await this.timeout.fill('timeout');
      await this.error.choose(this.errorValue);
      await this.expiryResponsbile.chooseType('Nobody & delete');
      await this.expiryPriority.choose('Low');
    }

    await this.customFieldsSection.toggle();
    const row = await this.customFields.addRow();
    await row.fill(['cf', 'value']);

    await this.codeSection.toggle();
    await this.code.fill('code');
  }

  async assertFill() {
    await this.name.expectValue(this.nameValue);
    await this.description.expectValue('test desc');
    await this.category.expectValue('test cat');

    if (this.options.responsible) {
      await this.responsible.expectType('Role from Attr.');
      await this.responsible.expectValue('"Teamleader"');
    }

    if (this.options.priority) {
      await this.priority.expectValue(/High/);
    }

    if (this.options.options) {
      if (this.options.options === 'persist') {
        await this.persist.expectChecked();
        await this.persist.click();
      } else {
        await this.skipTasklist.expectChecked();
        await this.notification.expectChecked();
        await this.delay.expectValue('delay');
      }
    }

    if (this.options.expiry) {
      await this.timeout.expectValue('timeout');
      await this.error.expectValue(this.errorValue);
      await this.expiryResponsbile.expectType('Nobody & delete');
      await this.expiryPriority.expectValue(/Low/);
    }

    await this.customFields.expectRowCount(1);
    await this.customFields.cell(0, 0).expectValue('cf');
    await this.customFields.cell(0, 2).expectValue('value');

    await this.code.expectValue('code');
  }

  async clear() {
    await this.name.clear();
    await this.description.clear();
    await this.category.clear();

    if (this.options.responsible) {
      await this.responsible.clear();
    }

    if (this.options.priority) {
      await this.priority.choose('Normal');
    }

    if (this.options.options) {
      if (this.options.options === 'list') {
        await this.skipTasklist.click();
        await this.notification.click();
        await this.delay.clear();
      }
    }

    if (this.options.expiry) {
      await this.timeout.clear();
    }

    await this.customFields.clear();

    await this.code.clear();
  }

  async assertClear() {
    await this.name.expectEmpty();
    await this.description.expectEmpty();
    await this.category.expectEmpty();

    if (this.options.responsible) {
      await this.responsible.expectType('Role');
      await this.responsible.expectValue('Everybody');
    }

    if (this.options.priority) {
      await this.priority.expectValue('Normal');
    }

    if (this.options.options) {
      await this.optionsSection.expectIsClosed();
    }
    if (this.options.expiry) {
      await this.expirySection.expectIsClosed();
    }
    await this.customFieldsSection.expectIsClosed();
    await this.codeSection.expectIsClosed();
  }
}

export class TaskTester extends NewPartTest {
  constructor(options?: { name?: string; error?: RegExp; testOptions?: TaskTestOptions }) {
    super('Task', (part: Part) => new Task(part, options?.name, options?.error, options?.testOptions));
  }
}

export const WsStartTaskTest = new TaskTester({
  error: /EventAndGateway/,
  testOptions: { responsible: false, priority: true, expiry: false, options: undefined }
});
export const TasksTest = new TasksTester();
