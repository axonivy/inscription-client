import { InscriptionView } from '../../pageobjects/InscriptionView';
import { Part } from '../../pageobjects/Part';

export abstract class PartObject {
  constructor(readonly part: Part) {}

  abstract fill(): Promise<void>;
  abstract assertFill(): Promise<void>;
  abstract clear(): Promise<void>;
  abstract assertClear(): Promise<void>;
}

export interface PartTest {
  partName: () => string;
  fill: (part: Part) => Promise<void>;
  assertFill: (part: Part) => Promise<void>;
  clear: (part: Part) => Promise<void>;
  assertClear: (part: Part) => Promise<void>;
}

export class NewPartTest implements PartTest {
  constructor(readonly name: string, readonly partObjectFactory: (part: Part) => PartObject) {}

  partName() {
    return this.name;
  }

  async fill(part: Part) {
    await this.partObjectFactory(part).fill();
  }

  async assertFill(part: Part) {
    await this.partObjectFactory(part).assertFill();
  }

  async clear(part: Part) {
    await this.partObjectFactory(part).clear();
  }

  async assertClear(part: Part) {
    await this.partObjectFactory(part).assertClear();
  }
}

export async function fillReloadAndAssert(inscriptionView: InscriptionView, tests: PartTest[]) {
  for (const test of tests) {
    const accordion = inscriptionView.accordion(test.partName());
    await accordion.toggle();
    await test.fill(accordion);
    await accordion.toggle();
  }
  await inscriptionView.reload();
  for (const test of tests) {
    const accordion = inscriptionView.accordion(test.partName());
    await accordion.toggle();
    await test.assertFill(accordion);
    await accordion.toggle();
  }
  for (const test of tests) {
    const accordion = inscriptionView.accordion(test.partName());
    await accordion.toggle();
    await test.clear(accordion);
    await accordion.toggle();
  }
  await inscriptionView.reload();
  for (const test of tests) {
    const accordion = inscriptionView.accordion(test.partName());
    await accordion.toggle();
    await test.assertClear(accordion);
    await accordion.toggle();
  }
}
