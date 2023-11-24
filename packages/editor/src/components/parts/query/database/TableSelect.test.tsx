import { ComboboxUtil, render } from 'test-utils';
import { TableSelect } from './TableSelect.js';

describe('TableSelect', () => {
  test('data', async () => {
    render(<TableSelect />, {
      wrapperProps: { data: { config: { query: { sql: { table: 'test' } } } }, meta: { tables: ['ivy', 'test', 'db'] } }
    });
    await ComboboxUtil.assertValue('test');
    await ComboboxUtil.assertOptionsCount(3);
  });
});
