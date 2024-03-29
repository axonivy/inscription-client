import type { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import type { Table } from '../../pageobjects/Table';
import type { ScriptArea } from '../../pageobjects/CodeEditor';
import type { Combobox } from '../../pageobjects/Combobox';

class Call extends PartObject {
  call: Combobox;
  mapping: Table;
  code: ScriptArea;

  constructor(part: Part, readonly selectLabel: string, private readonly selectValue: string, private readonly assertSelectValue: string) {
    super(part);
    this.call = part.combobox(selectLabel);
    this.mapping = part.table(['text', 'expression']);
    this.code = part.scriptArea();
  }

  async fill() {
    await this.call.choose(this.selectValue);
    await this.mapping.row(2).column(1).fill('"test"');
    await this.code.fill('code');
  }

  async assertFill() {
    await this.call.expectValue(this.assertSelectValue);
    await this.mapping.row(2).column(1).expectValue('"test"');
    await this.code.expectValue('code');
  }

  async clear() {
    await this.mapping.row(2).column(1).clearExpression();
    await this.code.clear();
  }

  async assertClear() {
    await this.call.expectValue(this.assertSelectValue);
    await this.mapping.row(2).column(1).expectEmpty();
    await this.code.expectEmpty();
  }
}

export const DialogCallTest = new NewPartTest(
  'Call',
  (part: Part) => new Call(part, 'Dialog', 'PersonEditor', 'com.acme.PersonEditor:start(ch.ivyteam.test.Person)')
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
