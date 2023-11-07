import { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import { TextArea } from '../../pageobjects/TextArea';

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
  time: TextArea;

  constructor(part: Part) {
    super(part);
    this.time = part.textArea('time');
  }

  async fill() {
    await this.time.fill('10');
  }

  async assertFill() {
    await this.time.expectValue('10');
  }

  async clear() {
    await this.time.clear();
  }

  async assertClear() {
    await this.time.expectEmpty();
  }
}

class FileIntermediateEventBean extends FilePickupStartEventBean {
  infoText: TextArea;
  path: TextArea;
  eventId: TextArea;

  constructor(part: Part) {
    super(part);
    this.infoText = part.textArea('Path of directory to scan');
    this.path = part.textArea('directory');
    this.eventId = part.textArea('eventId');
  }

  async fill() {
    await this.path.fill('/test/hello');
    await this.eventId.fill('testhello');
  }

  async assertFill() {
    await this.path.expectValue('/test/hello');
    await this.eventId.expectValue('testhello');
  }

  async clear() {
    await this.path.clear();
    await this.eventId.clear();
  }

  async assertClear() {
    await this.path.expectEmpty();
    await this.eventId.expectEmpty();
  }
}

export const ConfigFilePickupStartEventBeanTest = new NewPartTest('Configuration', (part: Part) => new FilePickupStartEventBean(part));
export const ConfigTimerBeanTest = new NewPartTest('Configuration', (part: Part) => new TimerBean(part));
export const ConfigFileIntermediateEventBeanTest = new NewPartTest('Configuration', (part: Part) => new FileIntermediateEventBean(part));
