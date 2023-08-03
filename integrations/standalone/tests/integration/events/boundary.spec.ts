import { test } from '@playwright/test';
import { NameTest, OutputTest, fillReloadAndAssert } from '../parts';
import { ErrorCatchTest } from '../parts/error-catch';
import { BoundarySignalCatchTest } from '../parts/signal-catch';
import { InscriptionView } from '../../pageobjects/InscriptionView';

test.describe('Boundary Events', () => {
  test('Error Boundary', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A4921D0EF0B91-f16');
    await inscriptionView.expectHeaderText('Error Boundary');
    await fillReloadAndAssert(inscriptionView, [NameTest, ErrorCatchTest, OutputTest]);
  });

  test('Signal Boundary', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('169A4921D0EF0B91-f17');
    await inscriptionView.expectHeaderText('Signal Boundary');
    await fillReloadAndAssert(inscriptionView, [NameTest, BoundarySignalCatchTest, OutputTest]);
  });
});
