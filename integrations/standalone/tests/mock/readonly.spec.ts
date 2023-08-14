import { test } from '../test';

test.describe('Readonly', () => {
  test('edit mode', async ({ view }) => {
    await view.mock();
    const name = view.accordion('Name');
    await name.toggle();
    await name.textArea('Display name').expectEnabled();
  });

  test('readonly mode', async ({ view }) => {
    await view.mock({ readonly: true });
    const name = view.accordion('Name');
    await name.toggle();
    await name.textArea('Display name').expectDisabled();
  });
});
