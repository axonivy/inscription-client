import { screen, userEvent } from 'test-utils';

export namespace CollapsableUtil {
  export async function toggle(byText: string) {
    await userEvent.click(screen.getByText(byText));
  }

  export async function assertClosed(byText: string) {
    expect(await screen.findByText(byText)).toHaveAttribute('data-state', 'closed');
  }

  export async function assertOpen(byText: string) {
    expect(await screen.findByText(byText)).toHaveAttribute('data-state', 'open');
  }
}
