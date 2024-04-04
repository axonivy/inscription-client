import type { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import type { Section } from '../../pageobjects/Section';
import type { Select } from '../../pageobjects/Select';
import type { ScriptInput } from '../../pageobjects/CodeEditor';
import type { RadioGroup } from '../../pageobjects/RadioGroup';
import type { Combobox } from '../../pageobjects/Combobox';

class Event extends PartObject {
  javaSection: Section;
  javaClass: Combobox;

  eventSection: Section;
  eventId: ScriptInput;

  expirySection: Section;
  duration: ScriptInput;
  errorTimeout: Select;
  action: RadioGroup;

  constructor(part: Part) {
    super(part);
    this.javaSection = part.section('Java Class');
    this.javaClass = this.javaSection.combobox();

    this.eventSection = part.section('Event ID');
    this.eventId = this.eventSection.scriptInput();

    this.expirySection = part.section('Expiry');
    this.duration = this.expirySection.scriptInput('Duration');
    this.errorTimeout = this.expirySection.select({ label: 'Error' });
    this.action = part.radioGroup();
  }

  async fill() {
    await this.javaSection.open();
    await this.javaClass.choose('ch.ivyteam.ivy.process.intermediateevent.AbstractProcessIntermediateEventBean');
    await this.eventSection.open();
    await this.eventId.fill('123');

    await this.expirySection.toggle();
    await this.duration.fill('3');
    await this.errorTimeout.choose('ivy:expiry:intermediate');
    await this.action.choose('Delete the Task');
  }

  async assertFill() {
    await this.javaClass.expectValue('ch.ivyteam.ivy.process.intermediateevent.AbstractProcessIntermediateEventBean');
    await this.eventId.expectValue('123');

    await this.expirySection.expectIsOpen();
    await this.duration.expectValue('3');
    await this.errorTimeout.expectValue('ivy:expiry:intermediate');
    await this.action.expectSelected('Delete the Task');
  }

  async clear() {
    await this.eventId.clear();

    await this.duration.clear();
    await this.errorTimeout.choose('ivy:expiry:intermediate');
    await this.action.choose('Do nothing');
  }

  async assertClear() {
    await this.javaClass.expectValue('ch.ivyteam.ivy.process.intermediateevent.AbstractProcessIntermediateEventBean');
    await this.eventSection.expectIsClosed();

    await this.expirySection.expectIsClosed();
  }
}

export const EventTest = new NewPartTest('Event', (part: Part) => new Event(part));
