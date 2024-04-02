import type { ScriptInput } from '../../pageobjects/CodeEditor';
import type { Combobox } from '../../pageobjects/Combobox';
import type { Part } from '../../pageobjects/Part';
import type { Section } from '../../pageobjects/Section';
import { NewPartTest, PartObject } from './part-tester';

class ErrorThrow extends PartObject {
  section: Section;
  error: Combobox;
  cause: ScriptInput;

  constructor(part: Part) {
    super(part);
    this.section = part.section('Error');
    this.error = this.section.combobox('Error Code to throw');
    this.cause = this.section.scriptInput('Error Cause');
  }

  async fill() {
    await this.section.open();
    await this.error.choose('test:error');
    await this.cause.fill('cause');
  }

  async assertFill() {
    await this.error.expectValue('test:error');
    await this.cause.expectValue('cause');
  }

  async clear() {
    await this.error.fill('undefined');
    await this.cause.clear();
  }

  async assertClear() {
    await this.section.expectIsClosed();
  }
}

export const ErrorThrowTest = new NewPartTest('Error', (part: Part) => new ErrorThrow(part));
