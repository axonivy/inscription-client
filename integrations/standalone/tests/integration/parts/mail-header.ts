import { Page, expect } from '@playwright/test';
import { PartTest } from './part-tester';
import { FocusCodeEditorUtil } from '../../utils/code-editor-util';

export class MailHeaderTester implements PartTest {
  constructor(private readonly hasTags: boolean = true) {}

  partName() {
    return 'Header';
  }
  async fill(page: Page) {
    await FocusCodeEditorUtil.fill(page, page.getByLabel('Subject'), 'subject');
    await FocusCodeEditorUtil.fill(page, page.getByLabel('From'), 'from');
    await FocusCodeEditorUtil.fill(page, page.getByLabel('Reply To'), 'reply');
    await FocusCodeEditorUtil.fill(page, page.getByLabel('To', { exact: true }), 'to');
    await FocusCodeEditorUtil.fill(page, page.getByLabel('CC', { exact: true }), 'cc');
    await FocusCodeEditorUtil.fill(page, page.getByLabel('BCC'), 'bcc');
  }
  async assertFill(page: Page) {
    await expect(page.getByLabel('Subject')).toHaveValue('subject');
    await expect(page.getByLabel('From')).toHaveValue('from');
    await expect(page.getByLabel('Reply To')).toHaveValue('reply');
    await expect(page.getByLabel('To', { exact: true })).toHaveValue('to');
    await expect(page.getByLabel('CC', { exact: true })).toHaveValue('cc');
    await expect(page.getByLabel('BCC')).toHaveValue('bcc');
  }
  async clear(page: Page) {
    await FocusCodeEditorUtil.clear(page, page.getByLabel('Subject'));
    await FocusCodeEditorUtil.clear(page, page.getByLabel('From'));
    await FocusCodeEditorUtil.clear(page, page.getByLabel('Reply To'));
    await FocusCodeEditorUtil.clear(page, page.getByLabel('To', { exact: true }));
    await FocusCodeEditorUtil.clear(page, page.getByLabel('CC', { exact: true }));
    await FocusCodeEditorUtil.clear(page, page.getByLabel('BCC'));
  }
  async assertClear(page: Page) {
    await expect(page.getByLabel('Subject')).toBeEmpty();
    await expect(page.getByLabel('From')).toBeEmpty();
    await expect(page.getByLabel('Reply To')).toBeEmpty();
    await expect(page.getByLabel('To', { exact: true })).toBeEmpty();
    await expect(page.getByLabel('CC', { exact: true })).toBeEmpty();
    await expect(page.getByLabel('BCC')).toBeEmpty();
  }
}

export const MailHeaderTest = new MailHeaderTester();
