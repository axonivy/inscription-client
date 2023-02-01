import ErrorSelect from './ErrorSelect';
import { render, screen, userEvent, waitFor } from 'test-utils';

describe('ErrorSelect', () => {
  function renderSelect(options?: { error?: string }) {
    const expiryErrors = [
      { id: 'error1', label: 'this is error1' },
      { id: 'bla', label: 'blablabla' }
    ];
    render(<ErrorSelect error={options?.error ?? ''} updateError={() => {}} />, { wrapperProps: { meta: { expiryErrors } } });
  }

  test('error select will render', async () => {
    renderSelect();
    const select = screen.getByRole('combobox');
    await waitFor(() => expect(select).toHaveTextContent('↓'));
    await userEvent.click(select);
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  test('error select will render with given error', async () => {
    renderSelect({ error: 'error1' });
    await waitFor(() => expect(screen.getByRole('combobox')).toHaveTextContent('this is error1'));
  });
});
