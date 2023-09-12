import { CollapsableUtil, SelectUtil, render } from 'test-utils';
import { Permission } from './Permission';

describe('Permission', () => {
  test('data', async () => {
    render(<Permission />, { wrapperProps: { data: { config: { permission: { error: '>> Ignore Exception', role: 'Test' } } } } });
    await CollapsableUtil.assertOpen('Permission');
    SelectUtil.assertValue('Test', { label: 'Role' });
    SelectUtil.assertValue('>> Ignore Exception', { label: 'Violation error' });
  });

  test('closed if empty', async () => {
    render(<Permission />);
    await CollapsableUtil.assertClosed('Permission');
  });
});
