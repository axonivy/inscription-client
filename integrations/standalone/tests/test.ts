import { test as base } from '@playwright/test';
import { InscriptionView } from './pageobjects/InscriptionView';

export const test = base.extend<{ view: InscriptionView }>({
  view: async ({ page }, use) => {
    let view = new InscriptionView(page);
    await use(view);
  }
});

export { expect } from '@playwright/test';
export { test as setup };
