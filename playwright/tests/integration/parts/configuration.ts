import type { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import type { TextArea } from '../../pageobjects/TextArea';
import type { ScriptArea } from '../../pageobjects/CodeEditor';
import type { Section } from '../../pageobjects/Section';

abstract class Configuration extends PartObject {
  section: Section;

  constructor(part: Part) {
    super(part);
    this.section = part.section('Configuration');
  }
}

class FilePickupStartEventBean extends Configuration {
  path: TextArea;
  processAttribut: TextArea;

  constructor(part: Part) {
    super(part);
    this.path = this.section.textArea({ nth: 0 });
    this.processAttribut = this.section.textArea({ nth: 1 });
  }

  async fill() {
    await this.path.fill('/test/hello');
    await this.processAttribut.fill('testhello');
  }

  async assertFill() {
    await this.path.expectValue('/test/hello');
    await this.processAttribut.expectValue('testhello');
  }

  async clear() {
    await this.path.clear();
    await this.processAttribut.clear();
  }

  async assertClear() {
    await this.path.expectEmpty();
    await this.processAttribut.expectEmpty();
  }
}

class TimerBean extends Configuration {
  time: ScriptArea;

  constructor(part: Part) {
    super(part);
    this.time = this.section.scriptInput();
  }

  override async fill() {
    await this.time.fill('10');
  }

  override async assertFill() {
    await this.time.expectValue('10');
  }

  override async clear() {
    await this.time.clear();
  }

  override async assertClear() {
    await this.time.expectEmpty();
  }
}

class FileIntermediateEventBean extends Configuration {
  path: TextArea;
  eventId: TextArea;

  constructor(part: Part) {
    super(part);
    this.path = this.section.textArea({ nth: 0 });
    this.eventId = this.section.textArea({ nth: 1 });
  }

  override async fill() {
    await this.path.fill('/test/hello');
    await this.eventId.fill('testhello');
  }

  override async assertFill() {
    await this.path.expectValue('/test/hello');
    await this.eventId.expectValue('testhello');
  }

  override async clear() {
    await this.path.clear();
    await this.eventId.clear();
  }

  override async assertClear() {
    await this.path.expectEmpty();
    await this.eventId.expectEmpty();
  }
}

export const ConfigFilePickupStartEventBeanTest = new NewPartTest('Configuration', (part: Part) => new FilePickupStartEventBean(part));
export const ConfigTimerBeanTest = new NewPartTest('Configuration', (part: Part) => new TimerBean(part));
export const ConfigFileIntermediateEventBeanTest = new NewPartTest('Configuration', (part: Part) => new FileIntermediateEventBean(part));
