import type { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import type { TextArea } from '../../pageobjects/TextArea';
import type { ScriptArea } from '../../pageobjects/CodeEditor';

class FilePickupStartEventBean extends PartObject {
  infoText: TextArea;
  path: TextArea;
  processAttribut: TextArea;

  constructor(part: Part) {
    super(part);
    this.infoText = part.textArea('Path of directory to scan');
    this.path = part.textArea('directory');
    this.processAttribut = part.textArea('processAttribute');
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

class TimerBean extends FilePickupStartEventBean {
  time: ScriptArea;

  constructor(part: Part) {
    super(part);
    this.time = part.scriptInput('time');
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

class FileIntermediateEventBean extends FilePickupStartEventBean {
  override infoText: TextArea;
  override path: TextArea;
  eventId: TextArea;

  constructor(part: Part) {
    super(part);
    this.infoText = part.textArea('Path of directory to scan');
    this.path = part.textArea('directory');
    this.eventId = part.textArea('eventId');
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
