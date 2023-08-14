import { test } from '../../test';
import { NameTest, OutputTest, fillReloadAndAssert } from '../parts';
import { ErrorCatchTest } from '../parts/error-catch';
import { BoundarySignalCatchTest } from '../parts/signal-catch';

test.describe('Boundary Events', () => {
  test('Error Boundary', async ({ view }) => {
    await view.selectElement('169A4921D0EF0B91-f16');
    await view.expectHeaderText('Error Boundary');
    await fillReloadAndAssert(view, [NameTest, ErrorCatchTest, OutputTest]);
  });

  test('Signal Boundary', async ({ view }) => {
    await view.selectElement('169A4921D0EF0B91-f17');
    await view.expectHeaderText('Signal Boundary');
    await fillReloadAndAssert(view, [NameTest, BoundarySignalCatchTest, OutputTest]);
  });
});
