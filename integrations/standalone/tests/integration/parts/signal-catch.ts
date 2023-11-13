import type { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import type { Combobox } from '../../pageobjects/Combobox';
import type { Checkbox } from '../../pageobjects/Checkbox';
import type { MacroEditor } from '../../pageobjects/CodeEditor';

class SignalCatch extends PartObject {
  signal: Combobox;
  signalMacro: MacroEditor;
  attach: Checkbox;

  constructor(part: Part, private readonly makroSupport: boolean = false) {
    super(part);
    this.signal = part.combobox('Signal Code');
    this.signalMacro = part.macroInput('Signal Code');
    this.attach = part.checkbox('Attach to Business Case that signaled this process');
  }

  async fill() {
    if (!this.makroSupport) {
      await this.signal.fill('test:signal');
      await this.attach.click();
    } else {
      await this.signalMacro.fill('test:signal');
    }
  }

  async assertFill() {
    if (!this.makroSupport) {
      await this.signal.expectValue('test:signal');
      await this.attach.expectUnchecked();
    } else {
      await this.signalMacro.expectValue('test:signal');
    }
  }

  async clear() {
    if (!this.makroSupport) {
      await this.signal.choose('');
      await this.attach.click();
    } else {
      await this.signalMacro.clear();
    }
  }

  async assertClear() {
    if (!this.makroSupport) {
      await this.signal.expectValue('');
      await this.attach.expectChecked();
    } else {
      await this.signalMacro.expectEmpty();
    }
  }
}

export const SignalCatchTest = new NewPartTest('Signal', (part: Part) => new SignalCatch(part));
export const BoundarySignalCatchTest = new NewPartTest('Signal', (part: Part) => new SignalCatch(part, true));
