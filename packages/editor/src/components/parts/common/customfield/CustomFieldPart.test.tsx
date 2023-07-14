import { WfCustomField } from '@axonivy/inscription-protocol';
import { render, screen, userEvent, TableUtil } from 'test-utils';
import CustomFieldPart from './CustomFieldPart';

describe('CustomFieldPart', () => {
  function renderTable(customFields?: WfCustomField[]) {
    render(<CustomFieldPart customFields={customFields ?? []} updateCustomFields={() => {}} type='CASE' />);
  }

  test('part render empty', async () => {
    renderTable();
    await userEvent.click(screen.getByRole('button', { name: /Custom Fields/ }));
    TableUtil.assertRowCount(0);
  });

  test('part render full', async () => {
    renderTable([
      { name: 'field1', type: 'STRING', value: 'this is a string' },
      { name: 'number', type: 'NUMBER', value: '1' }
    ]);
    TableUtil.assertRowCount(2);
  });
});
