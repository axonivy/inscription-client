import type { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import type { Table } from '../../pageobjects/Table';
import type { ScriptArea } from '../../pageobjects/CodeEditor';
import type { Combobox } from '../../pageobjects/Combobox';
import type { Section } from '../../pageobjects/Section';

class Call extends PartObject {
  callSection: Section;
  call: Combobox;
  mappingSection: Section;
  mapping: Table;
  codeSection: Section;
  code: ScriptArea;

  constructor(part: Part, readonly selectLabel: string, private readonly selectValue: string, private readonly assertSelectValue: string) {
    super(part);
    this.callSection = part.section(selectLabel);
    this.call = this.callSection.combobox();
    this.mappingSection = part.section('Mapping');
    this.mapping = this.mappingSection.table(['text', 'expression']);
    this.codeSection = part.section('Code');
    this.code = this.codeSection.scriptArea();
  }

  async fill() {
    await this.callSection.open();
    await this.call.choose(this.selectValue);
    await this.mappingSection.open();
    await this.mapping.row(2).column(1).fill('"test"');
    await this.codeSection.open();
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
    await this.mappingSection.expectIsClosed();
    await this.codeSection.expectIsClosed();
  }
}

export const DialogCallTest = new NewPartTest(
  'Dialog',
  (part: Part) => new Call(part, 'Dialog', 'PersonEditor', 'com.acme.PersonEditor:start(ch.ivyteam.test.Person)')
);

export const SubCallTest = new NewPartTest(
  'Process',
  (part: Part) =>
    new Call(
      part,
      'Process start',
      'AllElementsInscribedSubProcess',
      'AllElements/Inscribed/AllElementsInscribedSubProcess:call(String,Integer,String,Double)'
    )
);

export const TriggerCallTest = new NewPartTest(
  'Process',
  (part: Part) =>
    new Call(
      part,
      'Process start',
      'AllElementsInscribedProcess',
      'AllElements/Inscribed/AllElementsInscribedProcess:start(String,String,Number,Number,String,Number,String)'
    )
);
