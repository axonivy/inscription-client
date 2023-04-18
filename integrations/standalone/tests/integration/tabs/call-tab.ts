import { Page } from '@playwright/test';
import { TabTest } from './tab-tester';
import { TableUtil } from '../utils/table-util';
import { ComboboxUtil } from '../utils/combobox-util';
import { CodeEditorUtil } from '../utils/code-editor-util';

export class CallTabTester implements TabTest {
  constructor(
    private readonly tabLabel: string,
    private readonly selectLabel: string,
    private readonly selectValue: string,
    private readonly assertSelectValue: string
  ) {}

  tabName() {
    return this.tabLabel;
  }
  async fill(page: Page) {
    await ComboboxUtil.select(page, this.selectValue, this.selectLabel);
    await TableUtil.fillExpression(page, 2, '"test"');
    await CodeEditorUtil.fill(page, 'ivy.log.info("hi");');
  }
  async assertFill(page: Page) {
    await ComboboxUtil.assertSelect(page, this.assertSelectValue, this.selectLabel);
    await TableUtil.assertRow(page, 2, ['"test"']);
    await CodeEditorUtil.assertValue(page, 'ivy.log.info("hi");');
  }
  async clear(page: Page) {
    //TODO cannot reset dialog
    await TableUtil.fillExpression(page, 2, '');
    await CodeEditorUtil.focus(page);
    await CodeEditorUtil.clear(page);
  }
  async assertClear(page: Page) {
    await ComboboxUtil.assertSelect(page, this.assertSelectValue, this.selectLabel);
    await TableUtil.assertRow(page, 2, ['']);
    await CodeEditorUtil.assertValue(page, '');
  }
}

export const DialogCallTabTest = new CallTabTester(
  'Call',
  'Dialog',
  'PaymentRegistration',
  'ch.ivyteam.wf.PaymentRegistration:start(ch.ivyteam.test.Person)'
);
export const SubCallTabTest = new CallTabTester(
  'Process call',
  'Process start',
  'AllElementsInscribedSubProcess',
  'AllElements/Inscribed/AllElementsInscribedSubProcess:call(String,Integer,String,Double)'
);
export const TriggerCallTabTest = new CallTabTester(
  'Trigger',
  'Process start',
  'AllElementsInscribedProcess',
  'AllElements/Inscribed/AllElementsInscribedProcess:start(String,String,Number,Number,String,Number,String)'
);
