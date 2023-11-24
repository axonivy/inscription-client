import ExceptionSelect from './ExceptionSelect.js';
import { render, SelectUtil } from 'test-utils';

describe('ExceptionSelect', () => {
  function renderSelect(options?: { error?: string }) {
    const expiryErrors = [
      { id: 'error1', label: 'this is error1' },
      { id: 'bla', label: 'blablabla' }
    ];
    render(<ExceptionSelect value={options?.error ?? ''} onChange={() => {}} staticExceptions={['', 'test123']} />, {
      wrapperProps: { meta: { expiryErrors } }
    });
  }

  test('select will render', async () => {
    renderSelect();
    await SelectUtil.assertEmpty();
    await SelectUtil.assertOptionsCount(4);
  });

  test('select will render unknown value', async () => {
    renderSelect({ error: 'unknown' });
    await SelectUtil.assertValue('unknown');
  });

  test('select will render with given error', async () => {
    renderSelect({ error: 'error1' });
    await SelectUtil.assertValue('this is error1');
  });
});
