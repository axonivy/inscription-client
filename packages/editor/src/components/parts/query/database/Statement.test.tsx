import { CollapsableUtil, render, screen } from 'test-utils';
import { Statement } from './Statement.js';

describe('Statement', () => {
  test('data', async () => {
    render(<Statement />, {
      wrapperProps: { data: { config: { query: { sql: { stmt: 'test' } } } } }
    });
    await CollapsableUtil.assertOpen('Definition');
    expect(screen.getByRole('textbox')).toHaveValue('test');
  });
});
