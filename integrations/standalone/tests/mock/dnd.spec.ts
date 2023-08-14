import { test } from '../test';

test.describe('Drag and drop features', () => {
  test('Alternative condition reorder', async ({ view }) => {
    await view.mock({ type: 'Alternative' });
    const conditions = view.accordion('Condition');
    await conditions.toggle();

    const table = conditions.table(['label', 'expression']);
    await table.expectRowCount(2);
    await table.expectRows([/Mock Element/, /f6/]);

    table.row(0).dragTo(table.row(1));
    await table.expectRows([/f6/, /Mock Element/]);
  });
});
