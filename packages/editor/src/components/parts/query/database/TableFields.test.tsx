import { CollapsableUtil, TableUtil, render, screen } from 'test-utils';
import { TableFields } from './TableFields';

describe('TableFields', () => {
  test('data', async () => {
    render(<TableFields />, {
      wrapperProps: {
        data: { config: { query: { sql: { fields: { test: 'bla' } } } } },
        meta: {
          columns: [
            { name: 'test', type: 'VarChar(10)', ivyType: 'String' },
            { name: 'hi', type: 'bool', ivyType: 'Boolean' }
          ]
        }
      }
    });
    await CollapsableUtil.assertOpen('Fields');
    TableUtil.assertHeaders(['Column', 'Type', 'Value']);
    await screen.findByText('VarChar(10)');
    TableUtil.assertRows(['test VarChar(10) bla', 'hi bool']);
  });
});
