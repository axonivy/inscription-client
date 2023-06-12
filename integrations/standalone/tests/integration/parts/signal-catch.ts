import { Page, expect } from '@playwright/test';
import { PartTest } from './part-tester';
import { ComboboxUtil } from '../utils/combobox-util';

export class SignalCatchTester implements PartTest {
  constructor(private readonly makroSupport: boolean = false) {}

  partName() {
    return 'Signal';
  }
  async fill(page: Page) {
    await ComboboxUtil.setValue(page, 'test:signal');
    if (!this.makroSupport) {
      await page.getByRole('checkbox').uncheck();
    }
  }
  async assertFill(page: Page) {
    await ComboboxUtil.assertSelect(page, 'test:signal');
    if (!this.makroSupport) {
      await expect(page.getByRole('checkbox')).not.toBeChecked();
    }
  }
  async clear(page: Page) {
    await ComboboxUtil.select(page, '');
    if (!this.makroSupport) {
      await page.getByRole('checkbox').check();
    }
  }
  async assertClear(page: Page) {
    await ComboboxUtil.assertSelect(page, '');
    if (!this.makroSupport) {
      await expect(page.getByRole('checkbox')).toBeChecked();
    }
  }
}

export const SignalCatchTest = new SignalCatchTester();
