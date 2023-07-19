import { expect, test } from '@playwright/test';
import { InscriptionView } from '../../pageobjects/InscriptionView';
import { NameTest, OutputTest, fillReloadAndAssert } from '../parts';
import { MailHeaderTest } from '../parts/mail-header';
import { MailContentTest } from '../parts/mail-content';
import { MailAttachmentTest } from '../parts/mail-attachments';

test.describe('Interface Activities', () => {
  test('Database', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('0169A49845D37011-f6');
    await inscriptionView.expectHeaderText('Database');
    await fillReloadAndAssert(inscriptionView, [NameTest, OutputTest]);
  });

  test('WebService', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('0169A49845D37011-f12');
    await inscriptionView.expectHeaderText('Web Service');
    await fillReloadAndAssert(inscriptionView, [NameTest]);
  });

  test('Rest Client', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('0169A49845D37011-f14');
    await inscriptionView.expectHeaderText('Rest Client');
    await fillReloadAndAssert(inscriptionView, [NameTest]);
  });

  test('EMail', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('0169A49845D37011-f16');
    await inscriptionView.expectHeaderText('E-Mail');
    await fillReloadAndAssert(inscriptionView, [NameTest, MailHeaderTest, MailContentTest, MailAttachmentTest]);
  });

  test('Rule', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('0169A49845D37011-f7');
    await expect(page.locator('.no-editor')).toHaveText('No Editor found for type: ThirdPartyProgramInterface');
  });

  test('Program', async ({ page }) => {
    const inscriptionView = new InscriptionView(page);
    await inscriptionView.selectElement('0169A49845D37011-f23');
    await inscriptionView.expectHeaderText('Program');
    await fillReloadAndAssert(inscriptionView, [NameTest]);
  });
});
