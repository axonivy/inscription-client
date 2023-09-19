import { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import { Checkbox } from '../../pageobjects/Checkbox';

class Permissions extends PartObject {
  viewable: Checkbox;

  constructor(part: Part) {
    super(part);
    this.viewable = part.checkbox('Allow all workflow users to view the process on the Engine');
  }

  async fill() {
    await this.viewable.click();
  }

  async assertFill() {
    await this.viewable.expectUnchecked();
  }

  async clear() {
    await this.viewable.click();
  }

  async assertClear() {
    await this.viewable.expectChecked();
  }
}

export const PermissionsTest = new NewPartTest('Permissions', (part: Part) => new Permissions(part));
