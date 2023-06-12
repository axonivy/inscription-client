import { Page } from '@playwright/test';
import { PartTest } from './part-tester';
import { ComboboxUtil } from '../utils/combobox-util';

export class ErrorCatchTester implements PartTest {
  partName() {
    return 'Error';
  }
  async fill(page: Page) {
    await ComboboxUtil.select(page, 'ivy:error');
  }
  async assertFill(page: Page) {
    await ComboboxUtil.assertSelect(page, 'ivy:error');
  }
  async clear(page: Page) {
    await ComboboxUtil.select(page, '');
  }
  async assertClear(page: Page) {
    await ComboboxUtil.assertSelect(page, '');
  }
}

export const ErrorCatchTest = new ErrorCatchTester();
