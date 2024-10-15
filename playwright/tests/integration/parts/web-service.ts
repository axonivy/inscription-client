import type { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import type { Checkbox } from '../../pageobjects/Checkbox';
import type { Section } from '../../pageobjects/Section';
import type { Select } from '../../pageobjects/Select';
import type { ScriptInput } from '../../pageobjects/CodeEditor';

class WebService extends PartObject {
  permissionSection: Section;
  role: Select;
  error: Select;
  exceptionSection: Section;
  useExceptionHandling: Checkbox;
  condition: ScriptInput;
  message: ScriptInput;

  constructor(part: Part) {
    super(part);
    this.permissionSection = part.section('Permission');
    this.role = this.permissionSection.select({ label: 'Role' });
    this.error = this.permissionSection.select({ label: 'Violation error' });
    this.exceptionSection = part.section('Exception');
    this.useExceptionHandling = this.exceptionSection.checkbox('Use exception handling');
    this.condition = this.exceptionSection.scriptInput('Condition');
    this.message = this.exceptionSection.scriptInput('Message');
  }

  async fill() {
    await this.permissionSection.toggle();
    await this.role.choose('Support');
    await this.error.choose('>> Ignore Exception');

    await this.exceptionSection.toggle();
    await this.useExceptionHandling.click();
    await this.condition.fill('0===0');
    await this.message.fill('hallo');
  }

  async assertFill() {
    await this.permissionSection.expectIsOpen();
    await this.role.expectValue('Support');
    await this.error.expectValue('>> Ignore Exception');

    await this.exceptionSection.expectIsOpen();
    await this.useExceptionHandling.expectChecked();
    await this.condition.expectValue('0===0');
    await this.message.expectValue('hallo');
  }

  async clear() {
    await this.role.choose('Everybody');
    await this.error.choose('ivy:security:forbidden');

    await this.useExceptionHandling.click();
    await this.condition.clear();
    await this.message.clear();
  }

  async assertClear() {
    await this.permissionSection.expectIsClosed();
    await this.exceptionSection.expectIsClosed();
  }
}

export const WebServiceTest = new NewPartTest('Web Service', (part: Part) => new WebService(part));
