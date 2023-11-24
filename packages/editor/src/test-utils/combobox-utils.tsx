import { screen, userEvent, waitFor } from 'test-utils';

type ComboboxUtilOptions = {
  label?: string;
  nth?: number;
};

export namespace ComboboxUtil {
  export function select(options?: ComboboxUtilOptions) {
    if (options?.label) {
      return screen.getByRole('combobox', { name: options.label });
    }
    if (options?.nth) {
      return screen.getAllByRole('combobox').at(options.nth)!;
    }
    return screen.getByRole('combobox');
  }

  export async function assertEmpty(options?: ComboboxUtilOptions) {
    await assertValue('', options);
  }

  export async function assertValue(value: string, options?: ComboboxUtilOptions) {
    await waitFor(() => expect(select(options)).toHaveValue(value));
  }

  export async function assertOptionsCount(count: number, options?: ComboboxUtilOptions) {
    await userEvent.default.click(select(options));
    expect(screen.getAllByRole('option')).toHaveLength(count);
  }
}
