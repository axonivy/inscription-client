import { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import { Section } from '../../pageobjects/Section';
import { Select } from '../../pageobjects/Select';
import { ScriptInput } from '../../pageobjects/CodeEditor';
import { RadioGroup } from '../../pageobjects/RadioGroup';
import { Combobox } from '../../pageobjects/Combobox';

class Event extends PartObject {
  javaClass: Combobox;
  eventId: ScriptInput;

  expirySection: Section;
  duration: ScriptInput;
  errorTimeout: Select;
  action: RadioGroup;

  constructor(part: Part) {
    super(part);
    this.javaClass = part.combobox('Java Class');
    this.eventId = part.scriptInput('Event ID');

    this.expirySection = part.section('Expiry');
    this.duration = this.expirySection.scriptInput('Duration');
    this.errorTimeout = this.expirySection.select('Error');
    this.action = part.radioGroup();
  }

  async fill() {
    await this.javaClass.choose('ch.ivyteam.ivy.process.intermediateevent.AbstractProcessIntermediateEventBean');
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
    await this.eventId.expectEmpty();

    await this.expirySection.expectIsClosed();
  }
}

export const EventTest = new NewPartTest('Event', (part: Part) => new Event(part));
