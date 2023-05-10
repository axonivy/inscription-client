import { screen } from 'test-utils';

export namespace CollapsableUtil {
  export async function assertClosed(byText: string) {
    expect(await screen.findByText(byText)).toHaveAttribute('data-state', 'closed');
  }

  export async function assertOpen(byText: string) {
    expect(await screen.findByText(byText)).toHaveAttribute('data-state', 'open');
  }
}
