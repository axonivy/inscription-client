import { InscriptionView } from '../../pageobjects/InscriptionView';
import { Part } from '../../pageobjects/Part';

export interface PartTest {
  partName: () => string;
  fill: (part: Part) => Promise<void>;
  assertFill: (part: Part) => Promise<void>;
  clear: (part: Part) => Promise<void>;
  assertClear: (part: Part) => Promise<void>;
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
