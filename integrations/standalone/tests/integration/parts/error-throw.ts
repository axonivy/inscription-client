import { ScriptInput } from '../../pageobjects/CodeEditor';
import { Combobox } from '../../pageobjects/Combobox';
import { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';

class ErrorThrow extends PartObject {
  error: Combobox;
  cause: ScriptInput;

  constructor(part: Part) {
    super(part);
    this.error = part.combobox('Error Code to throw');
    this.cause = part.scriptInput('Error Cause');
  }

  async fill() {
    await this.error.choose('test:error');
    await this.cause.fill('cause');
  }

  async assertFill() {
    await this.error.expectValue('test:error');
    await this.cause.expectValue('cause');
  }

  async clear() {
    await this.error.fill('');
    await this.cause.clear();
  }

  async assertClear() {
    await this.error.expectValue('');
    await this.cause.expectEmpty();
  }
}

export const ErrorThrowTest = new NewPartTest('Error', (part: Part) => new ErrorThrow(part));
