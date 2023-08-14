import { test } from '../../test';
import { CaseTest, ConditionTest, EndPageTest, NameTest, OutputTest, TasksTest, fillReloadAndAssert } from '../parts';

test.describe('Gateways', () => {
  test('Alternative', async ({ view }) => {
    await view.selectElement('169A4921D0EF0B91-f5');
    await view.expectHeaderText('Alternative');
    await fillReloadAndAssert(view, [NameTest, ConditionTest]);
  });

  test('Join', async ({ view }) => {
    await view.selectElement('169A4921D0EF0B91-f7');
    await view.expectHeaderText('Join');
    await fillReloadAndAssert(view, [NameTest, OutputTest]);
  });

  test('Split', async ({ view }) => {
    await view.selectElement('169A4921D0EF0B91-f6');
    await view.expectHeaderText('Split');
    await fillReloadAndAssert(view, [NameTest, OutputTest]);
  });

  test('Tasks', async ({ view }) => {
    await view.selectElement('169A4921D0EF0B91-f8');
    await view.expectHeaderText('Tasks');
    await fillReloadAndAssert(view, [NameTest, OutputTest, TasksTest, CaseTest, EndPageTest]);
  });
});
