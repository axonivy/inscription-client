import { test } from '../../test';
import { EndPageTest, NameTest, NameTestWithoutTags, fillReloadAndAssert } from '../parts';

test.describe('End Events', () => {
  test('End', async ({ view }) => {
    await view.selectElement('169A4921D0EF0B91-f11');
    await view.expectHeaderText('End');
    await fillReloadAndAssert(view, [NameTest]);
  });

  test('End Page', async ({ view }) => {
    await view.selectElement('169A4921D0EF0B91-f12');
    await view.expectHeaderText('End Page');
    await fillReloadAndAssert(view, [NameTest, EndPageTest]);
  });

  test('Error End', async ({ view }) => {
    await view.selectElement('169A4921D0EF0B91-f13');
    await view.expectHeaderText('Error End');
    await fillReloadAndAssert(view, [NameTest]);
  });

  test('Embedded End', async ({ view }) => {
    await view.selectElement('0169A49845D37011-S10-g1');
    await view.expectHeaderText('Embedded End');
    await fillReloadAndAssert(view, [NameTestWithoutTags]);
  });

  test('Sub End', async ({ view }) => {
    await view.selectElement('169A4A2A4DC8B908-f1');
    await view.expectHeaderText('Sub End');
    await fillReloadAndAssert(view, [NameTest]);
  });

  test('WS End', async ({ view }) => {
    await view.selectElement('169A4A3BFDC7DFFE-ws1');
    await view.expectHeaderText('WS End');
    await fillReloadAndAssert(view, [NameTest]);
  });

  test('Process End', async ({ view }) => {
    await view.selectElement('167356B1245C7158-f1');
    await view.expectHeaderText('Process End');
    await fillReloadAndAssert(view, [NameTest]);
  });

  test('Exit End', async ({ view }) => {
    await view.selectElement('167356B1245C7158-f4');
    await view.expectHeaderText('Exit End');
    await fillReloadAndAssert(view, [NameTest]);
  });
});
