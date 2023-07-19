import { Accordion } from '../../pageobjects/Accordion';
import { PartTest } from './part-tester';
import { Part } from '../../pageobjects/Part';

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
    await part.macroInput('Name').fill(this.name);
    await part.macroArea('Description').fill('test desc');
    await part.macroInput('Category').fill('test cat');

    const roleChooser = part.responsibleSelect('Responsible');
    await roleChooser.chooseType('Role from Attr.');
    await roleChooser.fill('"Teamleader"');

    await part.select('Priority').choose('High');

    const options = part.section('Options');
    await options.toggle();
    await options.checkbox('Skip Tasklist').check();
    await options.input('Delay').fill('delay');

    const expiry = part.section('Expiry');
    await expiry.toggle();
    await expiry.scriptInput('Timeout').fill('timeout');
    await expiry.select('Error').choose(this.error);
    const responsible = expiry.responsibleSelect('Responsible');
    await responsible.chooseType('Nobody & delete');
    await expiry.select('Priority').choose('Low');

    const custom = part.section('Custom fields');
    await custom.toggle();
    const table = custom.table();
    const row = await table.addRow();
    await row.fill(['cf', 'value']);

    const code = part.section('Code');
    await code.toggle();
    await code.scriptArea().fill('code');
  }

  async assertFill(part: Part) {
    await part.macroInput('Name').expectValue(this.name);
    await part.macroArea('Description').expectValue('test desc');
    await part.macroInput('Category').expectValue('test cat');

    const responsible = part.responsibleSelect('Responsible');
    await responsible.expectType('Role from Attr.');
    await responsible.expectValue('"Teamleader"');

    await part.select('Priority').expectValue(/High/);

    const options = part.section('Options');
    await options.checkbox('Skip Tasklist').expectChecked();
    await options.scriptInput('Delay').expectValue('delay');

    const expiry = part.section('Expiry');
    await expiry.scriptInput('Timeout').expectValue('timeout');
    await expiry.select('Error').expectValue(this.error);
    await expiry.responsibleSelect('Responsible').expectType('Nobody & delete');
    await expiry.select('Priority').expectValue(/Low/);

    const custom = part.section('Custom Fields');
    const table = custom.table();
    await table.expectRowCount(1);
    await table.cell(0, 0).expectValue('cf');
    await table.cell(0, 2).expectValue('value');

    const code = part.section('Code');
    await code.scriptArea().expectValue('code');
  }

  async clear(part: Part) {
    await part.macroInput('Name').clear();
    await part.macroArea('Description').clear();
    await part.macroInput('Category').clear();

    const roleChooser = part.responsibleSelect('Responsible');
    await roleChooser.clear();

    await part.select('Priority').choose('Normal');

    const options = part.section('Options');
    await options.checkbox('Skip Tasklist').uncheck();
    await options.input('Delay').clear();

    const expiry = part.section('Expiry');
    await expiry.scriptInput('Timeout').clear();

    const custom = part.section('Custom fields');
    const table = custom.table();
    await table.clear();

    const code = part.section('Code');
    await code.scriptArea().clear();
  }

  async assertClear(part: Part) {
    await part.macroInput('Name').expectEmpty();
    await part.macroArea('Description').expectEmpty();
    await part.macroInput('Category').expectEmpty();

    const responsible = part.responsibleSelect('Responsible');
    await responsible.expectType('Role');
    await responsible.expectValue('Everybody');

    await part.select('Priority').expectValue('Normal');

    await part.section('Options').isClosed();
    await part.section('Expiry').isClosed();
    await part.section('Custom Fields').isClosed();
    await part.section('Code').isClosed();
  }
}

export const TaskTest = new TaskTester();

export const TasksTest = new TasksTester();
