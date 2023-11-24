import type { StartCustomStartField } from '@axonivy/inscription-protocol';
import { render, TableUtil, CollapsableUtil } from 'test-utils';
import StartCustomFieldPart from './StartCustomFieldPart.js';

describe('StartCustomFieldPart', () => {
  function renderTable(customFields?: StartCustomStartField[]) {
    render(<StartCustomFieldPart customFields={customFields ?? []} updateCustomFields={() => {}} />);
  }

  test('part render empty', async () => {
    renderTable();
    await CollapsableUtil.assertClosed('Custom Fields');
  });

  test('part render full', async () => {
    renderTable([
      { name: 'field1', value: 'this is a string' },
      { name: 'number', value: '1' }
    ]);
    TableUtil.assertRowCount(2);
  });
});
