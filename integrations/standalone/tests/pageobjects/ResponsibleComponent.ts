import type { RESPONSIBLE_TYPE, ValuesAsUnion } from '@axonivy/inscription-protocol';
import type { ScriptInput } from './CodeEditor';
import type { Select } from './Select';
import type { Section } from './Section';
import type { Part } from './Part';

export class ResponsibleComponent {
  private readonly section: Section;
  private readonly typeSelect: Select;
  private readonly script: ScriptInput;
  private readonly select: Select;

  constructor(readonly part: Part | Section) {
    this.section = part.section('Responsible');
    this.typeSelect = this.section.select({ nth: 0 });
    this.script = this.section.scriptInput();
    this.select = this.section.select({ nth: 1 });
  }

  async fill(type: ValuesAsUnion<typeof RESPONSIBLE_TYPE>, responsible?: string) {
    this.section.open();
    await this.typeSelect.choose(type);
    switch (type) {
      case 'Role from Attr.':
      case 'User from Attr.':
        await this.script.fill(responsible!);
        break;
      case 'Role':
        await this.select.choose(responsible!);
        break;
      case 'Nobody & delete':
    }
  }

  async expectFill(type: ValuesAsUnion<typeof RESPONSIBLE_TYPE>, responsible?: string) {
    await this.typeSelect.expectValue(type);
    switch (type) {
      case 'Role from Attr.':
      case 'User from Attr.':
        await this.script.expectValue(responsible!);
        break;
      case 'Role':
        await this.select.expectValue(responsible!);
        break;
      case 'Nobody & delete':
    }
  }

  async clear() {
    await this.typeSelect.choose('Role');
    await this.select.choose('Everybody');
  }

  async expectEmpty() {
    await this.section.expectIsClosed();
  }
}
