import { expect, test } from '../../test';
import { NameTest, OutputTest, fillReloadAndAssert } from '../parts';
import { MailHeaderTest } from '../parts/mail-header';
import { MailContentTest } from '../parts/mail-content';
import { MailAttachmentTest } from '../parts/mail-attachments';

test.describe('Interface Activities', () => {
  test('Database', async ({ view }) => {
    await view.selectElement('0169A49845D37011-f6');
    await view.expectHeaderText('Database');
    await fillReloadAndAssert(view, [NameTest, OutputTest]);
  });

  test('WebService', async ({ view }) => {
    await view.selectElement('0169A49845D37011-f12');
    await view.expectHeaderText('Web Service');
    await fillReloadAndAssert(view, [NameTest]);
  });

  test('Rest Client', async ({ view }) => {
    await view.selectElement('0169A49845D37011-f14');
    await view.expectHeaderText('Rest Client');
    await fillReloadAndAssert(view, [NameTest]);
  });

  test('EMail', async ({ view }) => {
    await view.selectElement('0169A49845D37011-f16');
    await view.expectHeaderText('E-Mail');
    await fillReloadAndAssert(view, [NameTest, MailHeaderTest, MailContentTest, MailAttachmentTest]);
  });

  test('Rule', async ({ view }) => {
    await view.selectElement('0169A49845D37011-f7');
    await expect(view.page.locator('.no-editor')).toHaveText('No Editor found for type: ThirdPartyProgramInterface');
  });

  test('Program', async ({ view }) => {
    await view.selectElement('0169A49845D37011-f23');
    await view.expectHeaderText('Program');
    await fillReloadAndAssert(view, [NameTest]);
  });
});
