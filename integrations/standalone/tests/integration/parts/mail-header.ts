import { Page, expect } from '@playwright/test';
import { PartTest } from './part-tester';

export class MailHeaderTester implements PartTest {
  constructor(private readonly hasTags: boolean = true) {}

  partName() {
    return 'Header';
  }
  async fill(page: Page) {
    await page.getByLabel('Subject').fill('subject');
    await page.getByLabel('From').fill('from');
    await page.getByLabel('Reply To').fill('reply');
    await page.getByLabel('To', { exact: true }).fill('to');
    await page.getByLabel('CC', { exact: true }).fill('cc');
    await page.getByLabel('BCC').fill('bcc');
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
    await page.getByLabel('Subject').clear();
    await page.getByLabel('From').clear();
    await page.getByLabel('Reply To').clear();
    await page.getByLabel('To', { exact: true }).clear();
    await page.getByLabel('CC', { exact: true }).clear();
    await page.getByLabel('BCC').clear();
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
