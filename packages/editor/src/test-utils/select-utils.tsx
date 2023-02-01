import { screen, userEvent, waitFor } from 'test-utils';

export namespace SelectUtil {
  export function combobox(label?: string) {
    if (label) {
      return screen.getByRole('combobox', { name: label });
    } else {
      return screen.getByRole('combobox');
    }
  }

  export async function assertEmpty(label?: string) {
    await assertValue('↓', label);
  }

  export async function assertValue(value: string, label?: string) {
    await waitFor(() => expect(combobox(label)).toHaveTextContent(value));
  }

  export async function assertOptionsCount(count: number, label?: string) {
    const select = combobox(label);
    await userEvent.click(select);
    expect(screen.getAllByRole('option')).toHaveLength(count);
  }
}
