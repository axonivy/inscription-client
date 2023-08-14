import { test } from '../../test';
import { CaseTest, EndPageTest, NameTest, OutputTest, TaskIntermediateTaskTest, WaitTaskTest, fillReloadAndAssert } from '../parts';

test.describe('Intermediate Events', () => {
  test('Task', async ({ view }) => {
    await view.selectElement('169A4921D0EF0B91-f9');
    await view.expectHeaderText('Task');
    await fillReloadAndAssert(view, [NameTest, OutputTest, TaskIntermediateTaskTest, CaseTest, EndPageTest]);
  });

  test('Wait', async ({ view }) => {
    await view.selectElement('169A4921D0EF0B91-f10');
    await view.expectHeaderText('Wait');
    await fillReloadAndAssert(view, [NameTest, WaitTaskTest, OutputTest]);
  });
});
