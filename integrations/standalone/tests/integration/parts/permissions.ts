import type { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import type { Checkbox } from '../../pageobjects/Checkbox';

class Permissions extends PartObject {
  viewable: Checkbox;
  defaultIsChecked: boolean;

  constructor(part: Part, defaultIsChecked: boolean) {
    super(part);
    this.viewable = part.checkbox('Allow all workflow users to view the process on the Engine');
    this.defaultIsChecked = defaultIsChecked;
  }

  async fill() {
    await this.viewable.click();
  }

  async assertFill() {
    if (this.defaultIsChecked) {
      await this.viewable.expectUnchecked();
    } else {
      await this.viewable.expectChecked();
    }
  }

  async clear() {
    await this.viewable.click();
  }

  async assertClear() {
    if (this.defaultIsChecked) {
      await this.viewable.expectChecked();
    } else {
      await this.viewable.expectUnchecked();
    }
  }
}

export const PermissionsTest = (defaultIsChecked = true) =>
  new NewPartTest('Permissions', (part: Part) => new Permissions(part, defaultIsChecked));
