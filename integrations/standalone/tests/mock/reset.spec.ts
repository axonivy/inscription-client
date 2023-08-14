import { test, expect } from '../test';

test.describe('Reset part', () => {
  test('reset button', async ({ view }) => {
    await view.mock();
    const part = view.accordion('Name');
    await part.toggle();

    const resetBtn = part.resetButton();
    await expect(resetBtn).not.toBeVisible();
    const name = part.textArea('Display name');
    await name.fill('bla');
    await expect(resetBtn).toBeVisible();

    await resetBtn.click();
    await name.expectValue('test name');
  });
});
