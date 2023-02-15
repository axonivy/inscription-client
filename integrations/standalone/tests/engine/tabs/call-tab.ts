import { Page } from '@playwright/test';
import { TabTest } from './tab-tester';
import { TableUtil } from '../utils/table-util';
import { ComboboxUtil } from '../utils/combobox-util';
import { CodeEditorUtil } from '../utils/code-editor-util';

export const CallTabTest: TabTest = {
  tabName: () => 'Call',
  fill: async (page: Page) => {
    await ComboboxUtil.select(page, 'PaymentRegistration', 'Dialog');
    await TableUtil.fillExpression(page, 2, '"test"');
    await CodeEditorUtil.fill(page, 'ivy.log.info("hi");');
  },
  assertFill: async (page: Page) => {
    await ComboboxUtil.assertSelect(page, 'ch.ivyteam.wf.PaymentRegistration:start(ch.ivyteam.test.Person)', 'Dialog');
    await TableUtil.assertRow(page, 2, ['"test"']);
    await CodeEditorUtil.assertValue(page, 'ivy.log.info("hi");');
  },
  clear: async (page: Page) => {
    //TODO cannot reset dialog
    await TableUtil.fillExpression(page, 2, '');
    await CodeEditorUtil.focus(page);
    await CodeEditorUtil.clear(page);
  },
  assertClear: async (page: Page) => {
    await ComboboxUtil.assertSelect(page, 'ch.ivyteam.wf.PaymentRegistration:start(ch.ivyteam.test.Person)', 'Dialog');
    await TableUtil.assertRow(page, 2, ['']);
    await CodeEditorUtil.assertValue(page, '');
  }
};
