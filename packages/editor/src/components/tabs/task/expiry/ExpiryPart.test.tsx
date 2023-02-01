import ExpiryPart from './ExpiryPart';
import { render, screen, userEvent, waitFor } from 'test-utils';

describe('ExpiryPart', () => {
  function renderExpiryPart(options?: { timeout?: string }) {
    // @ts-ignore
    const data: Data = { config: { task: { expiry: { timeout: options?.timeout ?? '' } } } };
    render(<ExpiryPart />, { wrapperProps: { data } });
  }

  test('expiry part only render empty timeout input', async () => {
    renderExpiryPart();
    const expiryCollapse = screen.getByRole('button', { name: /Expiry/ });
    await userEvent.click(expiryCollapse);

    const timeoutInput = screen.getByLabelText('Timeout');
    expect(timeoutInput).toHaveValue('');
    expect(screen.queryByText('Responsible')).not.toBeInTheDocument();
  });

  test('expiry part will render all', async () => {
    renderExpiryPart({ timeout: 'timeout' });
    const timeoutInput = screen.getByLabelText('Timeout');
    await waitFor(() => expect(timeoutInput).toHaveValue('timeout'));
    expect(screen.getByText('Responsible')).toBeInTheDocument();
  });
});
