import { test } from '@playwright/test';
import { InscriptionView } from '../../../pageobjects/InscriptionView';
import { MailAttachmentTest, MailContentTest, MailHeaderTest, GeneralTest, runTest } from '../../parts';
import { CreateProcessResult, createProcess } from '../../../glsp-protocol';

test.describe('EMail', () => {
  let view: InscriptionView;
  let testee: CreateProcessResult;

  test.beforeAll(async () => {
    testee = await createProcess('EMail');
  });

  test.beforeEach(async ({ page }) => {
    view = await InscriptionView.selectElement(page, testee.elementId);
  });

  test('Header', async () => {
    await view.expectHeaderText('E-Mail');
  });

  test('General', async () => {
    await runTest(view, GeneralTest);
  });

  test('MailHeader', async () => {
    await runTest(view, MailHeaderTest);
  });

  test('MailContent', async () => {
    await runTest(view, MailContentTest);
  });

  test('MailAttachments', async () => {
    await runTest(view, MailAttachmentTest);
  });
});
