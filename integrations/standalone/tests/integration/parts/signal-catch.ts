import { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import { Combobox } from '../../pageobjects/Combobox';
import { Checkbox } from '../../pageobjects/Checkbox';

class SignalCatch extends PartObject {
  signal: Combobox;
  attach: Checkbox;

  constructor(part: Part, private readonly makroSupport: boolean = false) {
    super(part);
    this.signal = part.combobox('Signal Code');
    this.attach = part.checkbox('Attach to Business Case that signaled this process');
  }

  async fill() {
    await this.signal.fill('test:signal');
    if (!this.makroSupport) {
      await this.attach.uncheck();
    }
  }

  async assertFill() {
    await this.signal.expectValue('test:signal');
    if (!this.makroSupport) {
      await this.attach.expectUnchecked();
    }
  }

  async clear() {
    await this.signal.choose('');
    if (!this.makroSupport) {
      await this.attach.check();
    }
  }

  async assertClear() {
    await this.signal.expectValue('');
    if (!this.makroSupport) {
      await this.attach.expectChecked();
    }
  }
}

export const SignalCatchTest = new NewPartTest('Signal', (part: Part) => new SignalCatch(part));
export const BoundarySignalCatchTest = new NewPartTest('Signal', (part: Part) => new SignalCatch(part, true));
