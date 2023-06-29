import ExpiryPart from './ExpiryPart';
import { render, screen, SelectUtil, userEvent } from 'test-utils';
import { WfExpiry } from '@axonivy/inscription-protocol';

describe('ExpiryPart', () => {
  function renderExpiryPart(data?: WfExpiry) {
    render(<ExpiryPart />, { wrapperProps: { data: data && { config: { task: { expiry: data } } } } });
  }

  test('expiry part only render empty timeout input', async () => {
    renderExpiryPart();
    const expiryCollapse = screen.getByRole('button', { name: /Expiry/ });
    await userEvent.click(expiryCollapse);

    expect(screen.getByLabelText('Timeout')).toHaveValue('');
    expect(screen.queryByText('Responsible')).not.toBeInTheDocument();
  });

  test('expiry part will render all', async () => {
    renderExpiryPart({
      timeout: 'timeout',
      error: 'f0',
      priority: { level: 'HIGH', script: '' },
      responsible: { type: 'ROLE_FROM_ATTRIBUTE', activator: 'asdf' }
    });
    expect(screen.getByLabelText('Timeout')).toHaveValue('timeout');
    await SelectUtil.assertValue('f0', { label: 'Error' });
    await SelectUtil.assertValue('Role from Attr.', { label: 'Responsible' });
    await SelectUtil.assertValue('High', { label: 'Priority' });
  });
});
