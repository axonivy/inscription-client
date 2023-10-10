import { RestEntityTypeCombobox } from './RestEntityTypeCombobox';
import { ComboboxUtil, render } from 'test-utils';

describe('RestEntityTypeCombobox', () => {
  function renderCombo(value: string, restEntityTypes?: string[]) {
    render(<RestEntityTypeCombobox value={value} onChange={() => {}} location='entity' id='' aria-labelledby='' />, {
      wrapperProps: { meta: { restEntityTypes } }
    });
  }

  test('empty', async () => {
    renderCombo('');
    await ComboboxUtil.assertEmpty();
    await ComboboxUtil.assertOptionsCount(1);
  });

  test('unknown value', async () => {
    renderCombo('unknown', ['test', 'other']);
    await ComboboxUtil.assertValue('unknown');
    await ComboboxUtil.assertOptionsCount(3);
  });

  test('known value', async () => {
    renderCombo('test', ['test', 'other']);
    await ComboboxUtil.assertValue('test');
    await ComboboxUtil.assertOptionsCount(2);
  });
});
