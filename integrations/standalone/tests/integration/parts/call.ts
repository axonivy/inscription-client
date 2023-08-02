import { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import { Table } from '../../pageobjects/Table';
import { ScriptArea } from '../../pageobjects/CodeEditor';
import { Combobox } from '../../pageobjects/Combobox';

class Call extends PartObject {
  call: Combobox;
  mapping: Table;
  code: ScriptArea;

  constructor(part: Part, readonly selectLabel: string, private readonly selectValue: string, private readonly assertSelectValue: string) {
    super(part);
    this.call = part.combobox(selectLabel);
    this.mapping = part.table(['text', 'label', 'expression']);
    this.code = part.scriptArea();
  }

  async fill() {
    await this.call.choose(this.selectValue);
    await this.mapping.row(2).column(2).fill('"test"');
    await this.code.fill('ivy.log.info("hi");');
  }

  async assertFill() {
    await this.call.expectValue(this.assertSelectValue);
    await this.mapping.row(2).column(2).expectValue('"test"');
    await this.code.expectValue('ivy.log.info("hi");');
  }

  async clear() {
    await this.mapping.row(2).column(2).edit('');
    await this.code.clear();
  }

  async assertClear() {
    await this.call.expectValue(this.assertSelectValue);
    await this.mapping.row(2).column(2).expectEmpty();
    await this.code.expectEmpty();
  }
}

export const DialogCallTest = new NewPartTest(
  'Call',
  (part: Part) => new Call(part, 'Dialog', 'PaymentRegistration', 'ch.ivyteam.wf.PaymentRegistration:start(ch.ivyteam.test.Person)')
);

export const SubCallTest = new NewPartTest(
  'Process call',
  (part: Part) =>
    new Call(
      part,
      'Process start',
      'AllElementsInscribedSubProcess',
      'AllElements/Inscribed/AllElementsInscribedSubProcess:call(String,Integer,String,Double)'
    )
);

export const TriggerCallTest = new NewPartTest(
  'Trigger',
  (part: Part) =>
    new Call(
      part,
      'Process start',
      'AllElementsInscribedProcess',
      'AllElements/Inscribed/AllElementsInscribedProcess:start(String,String,Number,Number,String,Number,String)'
    )
);
