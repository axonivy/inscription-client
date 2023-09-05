import { CollapsableUtil, render, screen } from 'test-utils';
import { Condition } from './Condition';

describe('Condition', () => {
  test('data', async () => {
    render(<Condition />, {
      wrapperProps: { data: { config: { query: { sql: { condition: 'test' } } } } }
    });
    await CollapsableUtil.assertOpen('Condition');
    expect(screen.getByRole('textbox')).toHaveValue('test');
  });
});
