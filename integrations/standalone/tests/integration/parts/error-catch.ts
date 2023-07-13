import { Part } from '../../pageobjects/Part';
import { ComboboxUtil } from '../utils/combobox-util';
import { PartTest } from './part-tester';

export class ErrorCatchTester implements PartTest {
  partName() {
    return 'Error';
  }
  async fill({ page }: Part) {
    await ComboboxUtil.select(page, 'ivy:error');
  }
  async assertFill({ page }: Part) {
    await ComboboxUtil.assertSelect(page, 'ivy:error');
  }
  async clear({ page }: Part) {
    await ComboboxUtil.select(page, '');
  }
  async assertClear({ page }: Part) {
    await ComboboxUtil.assertSelect(page, '');
  }
}

export const ErrorCatchTest = new ErrorCatchTester();
