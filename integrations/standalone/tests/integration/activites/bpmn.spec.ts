import { test } from '../../test';
import { NameTestWithoutTags, fillReloadAndAssert } from '../parts';

test.describe('BPMN Activities', () => {
  test('Generic', async ({ view }) => {
    await view.selectElement('169A49F1790F4A32-G10');
    await view.expectHeaderText('Generic');
    await fillReloadAndAssert(view, [NameTestWithoutTags]);
  });

  test('User', async ({ view }) => {
    await view.selectElement('169A49F1790F4A32-U20');
    await view.expectHeaderText('User');
  });

  test('Manual', async ({ view }) => {
    await view.selectElement('169A49F1790F4A32-M30');
    await view.expectHeaderText('Manual');
  });

  test('Script', async ({ view }) => {
    await view.selectElement('169A49F1790F4A32-S80');
    await view.expectHeaderText('Script');
  });

  test('Service', async ({ view }) => {
    await view.selectElement('169A49F1790F4A32-S70');
    await view.expectHeaderText('Service');
  });

  test('Rule', async ({ view }) => {
    await view.selectElement('169A49F1790F4A32-R50');
    await view.expectHeaderText('Rule');
  });

  test('Receive', async ({ view }) => {
    await view.selectElement('169A49F1790F4A32-R40');
    await view.expectHeaderText('Receive');
  });

  test('Send', async ({ view }) => {
    await view.selectElement('169A49F1790F4A32-S60');
    await view.expectHeaderText('Send');
  });
});
