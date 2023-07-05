import { expect } from '@playwright/test';
import { Part } from '../../pageobjects/Part';
import { ComboboxUtil } from '../utils/combobox-util';
import { PartTest } from './part-tester';

export class SignalCatchTester implements PartTest {
  constructor(private readonly makroSupport: boolean = false) {}

  partName() {
    return 'Signal';
  }
  async fill({ page }: Part) {
    await ComboboxUtil.setValue(page, 'test:signal');
    if (!this.makroSupport) {
      await page.getByRole('checkbox').uncheck();
    }
  }
  async assertFill({ page }: Part) {
    await ComboboxUtil.assertSelect(page, 'test:signal');
    if (!this.makroSupport) {
      await expect(page.getByRole('checkbox')).not.toBeChecked();
    }
  }
  async clear({ page }: Part) {
    await ComboboxUtil.select(page, '');
    if (!this.makroSupport) {
      await page.getByRole('checkbox').check();
    }
  }
  async assertClear({ page }: Part) {
    await ComboboxUtil.assertSelect(page, '');
    if (!this.makroSupport) {
      await expect(page.getByRole('checkbox')).toBeChecked();
    }
  }
}

export const SignalCatchTest = new SignalCatchTester();
