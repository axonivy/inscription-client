import ErrorSelect from './ErrorSelect';
import { render, SelectUtil } from 'test-utils';

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
    await SelectUtil.assertEmpty();
    await SelectUtil.assertOptionsCount(3);
  });

  test('error select will render unknown value', async () => {
    renderSelect({ error: 'unknown' });
    await SelectUtil.assertEmpty();
  });

  test('error select will render with given error', async () => {
    renderSelect({ error: 'error1' });
    await SelectUtil.assertValue('this is error1');
  });
});
