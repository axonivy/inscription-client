import type { WfCustomField } from '@axonivy/inscription-protocol';
import { render, TableUtil, CollapsableUtil } from 'test-utils';
import CustomFieldPart from './CustomFieldPart.js';

describe('CustomFieldPart', () => {
  function renderTable(customFields?: WfCustomField[]) {
    render(<CustomFieldPart customFields={customFields ?? []} updateCustomFields={() => {}} type='CASE' />);
  }

  test('part render empty', async () => {
    renderTable();
    await CollapsableUtil.assertClosed('Custom Fields');
  });

  test('part render full', async () => {
    renderTable([
      { name: 'field1', type: 'STRING', value: 'this is a string' },
      { name: 'number', type: 'NUMBER', value: '1' }
    ]);
    TableUtil.assertRowCount(2);
  });
});
